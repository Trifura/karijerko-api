import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { ProfileService } from '../profile/profile.service';
import { Project } from '../project/entities/project.entity';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private profileService: ProfileService,
    private companyService: CompanyService,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.find({ where: { id } });
  }

  async fetchFeed(account: Account, profileId: number) {
    const profile = await this.profileService.findOne(account, profileId);

    if (profile.user.id !== account.user.id) {
      return new UnauthorizedException('Unauthorized access');
    }

    const uniqueSkills = this.getUniqueSkills(profile.projects);

    return this.companyService.findAndSortBySkills(uniqueSkills);
  }

  getUniqueSkills(projects: Project[]) {
    const skillsMap = new Map();

    projects.forEach((project) => {
      project.skills.forEach((skill) => {
        if (!skillsMap.has(skill.name)) {
          skillsMap.set(skill.name, skill);
        }
      });
    });

    return Array.from(skillsMap.values());
  }
}
