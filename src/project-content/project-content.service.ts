import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectContentDto } from './dto/create-project-content.dto';
import { UpdateProjectContentDto } from './dto/update-project-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectContent } from './entities/project-content.entity';

@Injectable()
export class ProjectContentService {
  constructor(
    @InjectRepository(ProjectContent)
    private contentRepository: Repository<ProjectContent>,
  ) {}

  async create(createProjectContentDto: CreateProjectContentDto) {
    return await this.contentRepository.save(createProjectContentDto);
  }

  findAll() {
    return `This action returns all projectContent`;
  }

  async findOne(id: number) {
    const projectContent = await this.contentRepository.findOne({
      where: { id },
    });

    if (!projectContent) {
      throw new Error('Project content not found');
    }

    return projectContent;
  }

  async update(id: number, updateProjectContentDto: UpdateProjectContentDto) {
    const projectContent = await this.findOne(id);

    this.contentRepository.merge(projectContent, updateProjectContentDto);

    return await this.contentRepository.save(projectContent);
  }

  async remove(id: number) {
    const result = await this.contentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Project content with ID ${id} not found`);
    }

    return { message: 'Content deleted successfully', success: true };
  }
}
