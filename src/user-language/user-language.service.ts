import { Injectable } from '@nestjs/common';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UpdateUserLanguageDto } from './dto/update-user-language.dto';

@Injectable()
export class UserLanguageService {
  create(createUserLanguageDto: CreateUserLanguageDto) {
    return 'This action adds a new userLanguage';
  }

  findAll() {
    return `This action returns all userLanguage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLanguage`;
  }

  update(id: number, updateUserLanguageDto: UpdateUserLanguageDto) {
    return `This action updates a #${id} userLanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLanguage`;
  }
}
