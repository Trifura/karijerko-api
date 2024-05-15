import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(email);

    if (!account || account.password !== pass) {
      throw new UnauthorizedException();
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

      await queryRunner.manager.save(Account, {
        email,
        password,
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

      await queryRunner.manager.save(Account, {
        email,
        password,
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
