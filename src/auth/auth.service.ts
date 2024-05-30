import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource, IsNull, QueryRunner } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Company } from '../company/entities/company.entity';
import * as bcrypt from 'bcrypt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { AuthProviderDto } from './dto/auth-provider.dto';
import { MailService } from '../mail/mail.service';
import slugify from 'slugify';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private dataSource: DataSource,
    private configService: ConfigService,
    private mailService: MailService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
    );
  }

  async login(email: string, password: string): Promise<any> {
    const account = await this.accountService.findOne(email);

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
      account: this.createAccountPayload(account),
    };
  }

  async registerCompany(registerCompanyDto: RegisterCompanyDto) {
    await this.checkAccountExists(registerCompanyDto.email);

    registerCompanyDto.password = await this.hashPassword(
      registerCompanyDto.password,
    );
    const account = await this.createCompanyAccount(registerCompanyDto, false);

    const verifyToken = await this.signToken({
      email: account.email,
      id: account.id,
    });

    this.mailService.sendVerifyEmail(
      account.email,
      account.company.name,
      verifyToken,
    );

    return { message: 'Company registered successfully' };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    await this.checkAccountExists(registerUserDto.email);

    registerUserDto.password = await this.hashPassword(
      registerUserDto.password,
    );
    const account = await this.createUserAccount(registerUserDto, false);

    const verifyToken = await this.signToken({
      email: account.email,
      id: account.id,
    });

    this.mailService.sendVerifyEmail(
      account.email,
      account.user.firstName,
      verifyToken,
    );

    return { message: 'User registered successfully' };
  }

  async authenticateGoogle(accessToken: string, role: string) {
    const profile = await this.verifyGoogleToken(accessToken);

    const accounts = await this.accountService.findAll({
      where: { email: profile.email },
      relations: ['user', 'company'],
    });

    if (!accounts.length) {
      const account = await this.createAccountFromGoogleProfile(profile, role);

      const newAccount = await this.accountService.findOne(account.email);

      this.sendWelcomeEmail(newAccount);

      return {
        token: await this.signToken({ email: account.email, id: account.id }),
        account: this.createAccountPayload(newAccount),
      };
    }

    const providerAccount = accounts.find(
      (account) => account.providerType === 'google',
    );

    if (providerAccount) {
      return {
        token: await this.signToken({
          email: providerAccount.email,
          id: providerAccount.id,
        }),
        account: this.createAccountPayload(providerAccount),
      };
    }

    const otherProviderAccount = accounts[0];
    const account = await this.accountService.create({
      email: profile.email,
      providerType: 'google',
      providerId: profile.sub,
      role: otherProviderAccount.role,
      isVerified: true,
      user: otherProviderAccount.user,
      company: otherProviderAccount.company,
    });

    return {
      token: await this.signToken({ email: account.email, id: account.id }),
      // TODO: handle this better, it works for now because we only have google and local as providers
      account: this.createAccountPayload(otherProviderAccount),
    };
  }

  getProfile(account: Account) {
    return this.createAccountPayload(account);
  }

  async verifyEmail(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    const account = await this.accountService.findOneById(payload.id);

    if (!account) {
      throw new BadRequestException('Invalid token');
    }

    if (account.isVerified) {
      return { message: 'Email already verified', success: false };
    }

    account.isVerified = true;
    await this.accountService.update(payload.id, account);

    this.sendWelcomeEmail(account);

    return { message: 'Email verified successfully', success: true };
  }

  /**
   * Private methods
   */

  private async verifyGoogleToken(accessToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: accessToken,
        audience: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  private async signToken(payload: { email: string; id: number }) {
    return await this.jwtService.signAsync(payload);
  }

  private async createUserAccount(
    { firstName, lastName, password, email }: RegisterUserDto,
    isVerified: boolean,
    authProvider?: AuthProviderDto,
  ) {
    return await this.createAccountTransactional(async (queryRunner) => {
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
      return account;
    });
  }

  private async createCompanyAccount(
    { name, password, email }: RegisterCompanyDto,
    isVerified: boolean,
    authProvider?: AuthProviderDto,
  ) {
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g });
    return await this.createAccountTransactional(async (queryRunner) => {
      const company = await queryRunner.manager.save(Company, { name, slug });
      const account = await queryRunner.manager.save(Account, {
        email,
        password,
        company,
        role: 'company',
        isVerified,
        providerType: authProvider?.providerType,
        providerId: authProvider?.providerId,
      });
      return account;
    });
  }

  private async createAccountTransactional(
    callback: (queryRunner: QueryRunner) => Promise<Account>,
  ): Promise<Account> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const account = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return account;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  private async checkAccountExists(email: string) {
    const account = await this.accountService.findAll({
      where: { email },
    });

    if (account.length) {
      throw new BadRequestException('Account already registered');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async createAccountFromGoogleProfile(
    profile: TokenPayload,
    role: string,
  ): Promise<Account> {
    if (role === 'user') {
      return await this.createUserAccount(
        {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
        },
        true,
        { providerType: 'google', providerId: profile.sub },
      );
    } else if (role === 'company') {
      return await this.createCompanyAccount(
        {
          name: profile.name,
          email: profile.email,
        },
        true,
        { providerType: 'google', providerId: profile.sub },
      );
    }

    throw new BadRequestException('Invalid role');
  }

  private createAccountPayload(account: Account) {
    if (account.role === 'company') {
      return {
        email: account.email,
        name: account.company.name,
        profilePicture: account.company.profilePicture,
        role: account.role,
      };
    }

    return {
      email: account.email,
      firstName: account.user.firstName,
      lastName: account.user.lastName,
      profilePicture: account.user.profilePicture,
      role: account.role,
    };
  }

  private sendWelcomeEmail(account: Account) {
    if (account.role === 'company') {
      this.mailService.sendWelcomeCompanyEmail(
        account.company.name,
        account.email,
      );
    } else if (account.role === 'user') {
      this.mailService.sendWelcomeUserEmail(
        account.user.firstName,
        account.email,
      );
    }
  }
}
