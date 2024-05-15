import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Company } from '../company/entities/company.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

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
      token: await this.jwtService.signAsync(payload),
    };
  }

  async registerCompany(email: string, password: string, name: string) {
    // Make this transactional because if one entity fails,
    // so it doesn't save the other entity without the relationship
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const company = await queryRunner.manager.save(Company, {
        name,
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      await queryRunner.manager.save(Account, {
        email,
        password: hashedPassword,
        company,
        role: 'company',
        isVerified: false,
      });
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }

    // send verification email to the user

    return { message: 'Company registered successfully' };
  }

  async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
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

      const hashedPassword = await bcrypt.hash(password, 10);

      await queryRunner.manager.save(Account, {
        email,
        password: hashedPassword,
        user,
        role: 'user',
        isVerified: false,
      });
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }

    // send verification email to the user

    return { message: 'User registered successfully' };
  }
}
