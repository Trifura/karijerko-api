import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuerySkillDto } from '../skill/dto/query-skill.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async findAll(query: QuerySkillDto) {
    const limit = 20;

    return await this.languageRepository
      .createQueryBuilder('language')
      .where('language.name ILIKE :name', { name: `%${query.search}%` })
      .limit(limit)
      .getMany();
  }
}
