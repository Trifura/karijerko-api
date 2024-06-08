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
import slugify from 'slugify';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(account: Account, createProfileDto: CreateProfileDto) {
    if (!createProfileDto.name) {
      throw new Error('Name is required');
    }

    createProfileDto.slug = slugify(createProfileDto.name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

    createProfileDto.isPrimary = false;

    const profile = this.profileRepository.create(createProfileDto);

    profile.user = account.user;
    profile.projects = [];

    return await this.profileRepository.save(profile);
  }

  async findAll(account: Account) {
    return await this.profileRepository.find({
      where: { user: { id: account.user.id } },
      relations: ['projects'],
    });
  }

  async findOne(account: Account, id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['projects', 'user'],
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

  async update(
    account: Account,
    id: number,
    updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.findOne(account, id);

    updateProfileDto.slug = slugify(updateProfileDto.name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

    this.profileRepository.merge(profile, updateProfileDto);

    return await this.profileRepository.save(profile);
  }

  async remove(account: Account, id: number) {
    const profile = await this.findOne(account, id);

    return await this.profileRepository.remove(profile);
  }
}
