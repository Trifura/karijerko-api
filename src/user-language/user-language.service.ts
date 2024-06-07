import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UpdateUserLanguageDto } from './dto/update-user-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLanguage } from './entities/user-language.entity';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class UserLanguageService {
  constructor(
    @InjectRepository(UserLanguage)
    private userLanguageRepository: Repository<UserLanguage>,
  ) {}

  async create(account: Account, createUserLanguageDto: CreateUserLanguageDto) {
    const userLanguage = this.userLanguageRepository.create(
      createUserLanguageDto,
    );
    userLanguage.user = account.user;
    return await this.userLanguageRepository.save(userLanguage);
  }

  async findAll(account: Account) {
    return await this.userLanguageRepository.find({
      where: { user: { id: account.user.id } },
      relations: ['language'],
    });
  }

  async findOne(account: Account, id: number) {
    const userLanguage = await this.userLanguageRepository.findOne({
      where: { id },
      relations: ['user', 'language'],
    });

    if (!userLanguage) {
      throw new NotFoundException(`UserLanguage with id ${id} not found`);
    }

    if (userLanguage.user.id !== account.user.id) {
      throw new UnauthorizedException(
        `You are not authorized to access this userLanguage`,
      );
    }
    return userLanguage;
  }

  async update(
    account: Account,
    id: number,
    updateUserLanguageDto: UpdateUserLanguageDto,
  ) {
    const userLanguage = await this.findOne(account, id);

    this.userLanguageRepository.merge(userLanguage, updateUserLanguageDto);

    return await this.userLanguageRepository.save(userLanguage);
  }

  async remove(account: Account, id: number) {
    const userLanguage = await this.findOne(account, id);
    return await this.userLanguageRepository.remove(userLanguage);
  }
}
