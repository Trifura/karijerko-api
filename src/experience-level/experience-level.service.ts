import { Injectable } from '@nestjs/common';
import { CreateExperienceLevelDto } from './dto/create-experience-level.dto';
import { UpdateExperienceLevelDto } from './dto/update-experience-level.dto';

@Injectable()
export class ExperienceLevelService {
  create(createExperienceLevelDto: CreateExperienceLevelDto) {
    return 'This action adds a new experienceLevel';
  }

  findAll() {
    return `This action returns all experienceLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experienceLevel`;
  }

  update(id: number, updateExperienceLevelDto: UpdateExperienceLevelDto) {
    return `This action updates a #${id} experienceLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} experienceLevel`;
  }
}
