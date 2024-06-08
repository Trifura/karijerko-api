import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Account } from '../account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProfileService } from '../profile/profile.service';
import { ProjectContentService } from '../project-content/project-content.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private profileService: ProfileService,
    private contentService: ProjectContentService,
  ) {}

  async create(account: Account, createProjectDto: CreateProjectDto) {
    const profile = await this.profileService.findOne(
      account,
      createProjectDto.profileId,
    );

    if (!profile) {
      throw new Error('Profile not found');
    }

    if (profile.user.id !== account.user.id) {
      throw new Error('You are not authorized to access this profile');
    }

    const project = this.projectRepository.create(createProjectDto);

    project.profile = profile;

    project.contents = await Promise.all(
      createProjectDto.contents.map((content) =>
        this.contentService.create(content),
      ),
    );

    return await this.projectRepository.save(project);
  }

  findAll(account: Account) {
    return `This action returns all project`;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['skills', 'contents', 'profile'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(
    account: Account,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const profile = await this.profileService.findOne(
      account,
      updateProjectDto.profileId,
    );

    if (!profile) {
      throw new Error('Profile not found');
    }

    if (profile.user.id !== account.user.id) {
      throw new Error('You are not authorized to access this profile');
    }

    const project = await this.findOne(id);

    project.contents = await Promise.all(
      updateProjectDto.contents.map((content) =>
        this.contentService.create(content),
      ),
    );

    project.skills = updateProjectDto.skills; // override skills;

    this.projectRepository.merge(project, updateProjectDto);

    return await this.projectRepository.save(project);
  }

  async remove(account: Account, id: number) {
    const project = await this.findOne(id);

    const profile = await this.profileService.findOne(
      account,
      project.profile.id,
    );

    if (!profile) {
      throw new Error('Profile not found');
    }

    if (profile.user.id !== account.user.id) {
      throw new Error('You are not authorized to access this project');
    }

    return await this.projectRepository.remove(project);
  }
}
