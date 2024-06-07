import { Injectable } from '@nestjs/common';
import { CreateProjectContentDto } from './dto/create-project-content.dto';
import { UpdateProjectContentDto } from './dto/update-project-content.dto';

@Injectable()
export class ProjectContentService {
  create(createProjectContentDto: CreateProjectContentDto) {
    return 'This action adds a new projectContent';
  }

  findAll() {
    return `This action returns all projectContent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectContent`;
  }

  update(id: number, updateProjectContentDto: UpdateProjectContentDto) {
    return `This action updates a #${id} projectContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectContent`;
  }
}
