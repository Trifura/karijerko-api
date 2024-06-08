import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(account: Account, createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto);

    profile.user = account.user;
    profile.projects = [];

    return await this.profileRepository.save(profile);
  }

  async findAll(account: Account) {
    return await this.profileRepository.find({
      where: { user: { id: account.user.id } },
    });
  }

  async findOne(account: Account, id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    if (profile.user.id !== account.user.id) {
      throw new UnauthorizedException(
        `You are not authorized to access this profile`,
      );
    }

    return profile;
  }

  update(account: Account, id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(account: Account, id: number) {
    return `This action removes a #${id} profile`;
  }
}
