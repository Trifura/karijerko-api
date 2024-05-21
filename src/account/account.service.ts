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
  async create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(account);
  }

  async findAll(query?: any) {
    return await this.accountRepository.find(query);
  }

  async findOne(email: string) {
    return await this.accountRepository.findOne({
      where: { email },
      relations: ['user', 'company'],
    });
  }

  async findOneById(id: number) {
    return await this.accountRepository.findOne({
      where: { id },
      relations: ['user', 'company'],
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOneById(id);

    this.accountRepository.merge(account, updateAccountDto);

    return this.accountRepository.save(account);
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
