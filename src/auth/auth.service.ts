import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Company } from '../company/entities/company.entity';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { AuthProviderDto } from './dto/auth-provider.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
    );
  }

  async login(email: string, password: string): Promise<any> {
    const account = await this.accountService.findOne(email);

    // TODO: handle if google exists but local account doesn't
    if (!account || !account.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!account.isVerified) {
      throw new UnauthorizedException('Account not verified');
    }

    const payload = { email: account.email, id: account.id };

    return {
      token: await this.signToken(payload),
    };
  }

  async registerCompany(registerCompanyDto: RegisterCompanyDto) {
    // check if the company exists in the database by email
    const companyAccount = await this.accountService.findAll({
      where: { email: registerCompanyDto.email, providerType: null },
    });

    if (companyAccount.length) {
      throw new BadRequestException('Company already registered');
    }

    registerCompanyDto.password = await bcrypt.hash(
      registerCompanyDto.password,
      10,
    );

    const company = await this.createCompanyAccount(registerCompanyDto, false);
    console.log(company);
    // send verification email to the company

    return { message: 'Company registered successfully' };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const userAccount = await this.accountService.findAll({
      where: { email: registerUserDto.email, providerType: null },
    });

    if (userAccount.length) {
      throw new BadRequestException('User already registered');
    }

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.createUserAccount(registerUserDto, false);
    console.log(user);
    // send verification email to the user

    return { message: 'User registered successfully' };
  }

  async authenticateGoogle(accessToken: string, role: string) {
    const profile = await this.verifyGoogleToken(accessToken);

    // check if the profile (account) exists in the database by email
    const accounts = await this.accountService.findAll({
      where: { email: profile.email },
      relations: ['user', 'company'],
    });

    // if it doesn't exist, create an account and user/company entity and return JWT
    if (!accounts.length) {
      // if it doesn't exist, create an account and user/company entity and return JWT
      // if it's a company, create a company entity
      // if it's a user, create a user entity

      let account: Account;

      if (role === 'user') {
        account = await this.createUserAccount(
          {
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
          },
          true,
          { providerType: 'google', providerId: profile.sub },
        );
      } else if (role === 'company') {
        account = await this.createCompanyAccount(
          {
            name: profile.name,
            email: profile.email,
          },
          true,
          { providerType: 'google', providerId: profile.sub },
        );
      }

      return {
        token: await this.signToken({ email: account.email, id: account.id }),
      };
    }

    // if it exists, and it's the same provider, return JWT
    const providerAccount = accounts.find(
      (account) => account.providerType === 'google',
    );

    if (providerAccount) {
      const payload = { email: providerAccount.email, id: providerAccount.id };
      return {
        token: await this.signToken(payload),
      };
    }

    // if it exists, but it's a different provider, create an account entity and return JWT
    const otherProviderAccount = accounts[0];

    if (otherProviderAccount.role === 'company') {
    }

    const account = await this.accountService.create({
      email: profile.email,
      providerType: 'google',
      providerId: profile.sub,
      role: otherProviderAccount.role,
      isVerified: true,
      user: otherProviderAccount.user,
      company: otherProviderAccount.company,
    });

    const payload = { email: account.email, id: account.id };
    return {
      token: await this.signToken(payload),
    };
  }

  async verifyGoogleToken(accessToken: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: accessToken,
      audience: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }
    return payload;
  }

  async signToken(payload: { email: string; id: number }) {
    return await this.jwtService.signAsync(payload);
  }

  async createUserAccount(
    { firstName, lastName, password, email }: RegisterUserDto,
    isVerified: boolean,
    authProvider?: AuthProviderDto,
  ) {
    // Make this transactional because if one entity fails,
    // so it doesn't save the other entity without the relationship
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(User, {
        firstName,
        lastName,
      });

      const account = await queryRunner.manager.save(Account, {
        email,
        password,
        user,
        role: 'user',
        isVerified,
        providerType: authProvider?.providerType,
        providerId: authProvider?.providerId,
      });
      await queryRunner.commitTransaction();

      return account;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async createCompanyAccount(
    { name, password, email }: RegisterCompanyDto,
    isVerified: boolean,
    authProvider?: AuthProviderDto,
  ) {
    // Make this transactional because if one entity fails,
    // so it doesn't save the other entity without the relationship
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const company = await queryRunner.manager.save(Company, {
        name,
      });

      const account = await queryRunner.manager.save(Account, {
        email,
        password,
        company,
        role: 'company',
        isVerified,
        providerType: authProvider?.providerType,
        providerId: authProvider?.providerId,
      });
      await queryRunner.commitTransaction();

      return account;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
