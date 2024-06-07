import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Account } from '../account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  async create(account: Account, createEducationDto: CreateEducationDto) {
    const education = this.educationRepository.create(createEducationDto);

    education.user = account.user;

    return await this.educationRepository.save(education);
  }
  async findAll(account: Account) {
    console.log(account);
    return await this.educationRepository.find({
      where: { user: { id: account.user.id } },
    });
  }

  async findOne(account: Account, id: number) {
    const education = await this.educationRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!education) {
      throw new NotFoundException(`Education with id ${id} not found`);
    }

    if (education.user.id !== account.user.id) {
      throw new UnauthorizedException(
        `You are not authorized to access this education`,
      );
    }

    return education;
  }

  async update(
    account: Account,
    id: number,
    updateEducationDto: UpdateEducationDto,
  ) {
    const education = await this.findOne(account, id);

    this.educationRepository.merge(education, updateEducationDto);

    return await this.educationRepository.save(education);
  }

  async remove(account: Account, id: number) {
    const education = await this.findOne(account, id);

    return await this.educationRepository.remove(education);
  }
}
