import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { ProfileService } from '../profile/profile.service';
import { Project } from '../project/entities/project.entity';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
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

    if (uniqueSkills.length)
      return this.companyService.findAndSortBySkills(uniqueSkills);

    return this.companyService.findAll();
  }

  async subscribeCompany(account: Account, companyId: string) {
    const user = await this.userRepository.findOne({
      where: { id: account.user.id },
      relations: ['subscribedCompanies'],
    });

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!user.subscribedCompanies) {
      user.subscribedCompanies = [];
    }

    const isSubscribed = user.subscribedCompanies.some(
      (c) => c.id === companyId,
    );

    if (isSubscribed) {
      return new BadRequestException('Already subscribed to this company');
    }

    user.subscribedCompanies.push(company);
    return await this.userRepository.save(user);
  }

  async unsubscribeCompany(account: Account, companyId: string) {
    const user = await this.userRepository.findOne({
      where: { id: account.user.id },
      relations: ['subscribedCompanies'],
    });

    user.subscribedCompanies = user.subscribedCompanies.filter(
      (company) => company.id !== companyId,
    );

    return await this.userRepository.save(user);
  }

  async getSubscribedCompanies(userId: number): Promise<Company[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'subscribedCompanies',
        'subscribedCompanies.industry',
        'subscribedCompanies.companySize',
      ],
    });

    return user.subscribedCompanies;
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
