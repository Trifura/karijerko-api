import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  findAll(query?: any) {
    return this.accountRepository.find(query);
  }

  findOne(email: string) {
    return this.accountRepository.findOne({ where: { email } });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
