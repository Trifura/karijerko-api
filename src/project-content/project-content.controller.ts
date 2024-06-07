import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectContentService } from './project-content.service';
import { CreateProjectContentDto } from './dto/create-project-content.dto';
import { UpdateProjectContentDto } from './dto/update-project-content.dto';

@Controller('project-content')
export class ProjectContentController {
  constructor(private readonly projectContentService: ProjectContentService) {}

  @Post()
  create(@Body() createProjectContentDto: CreateProjectContentDto) {
    return this.projectContentService.create(createProjectContentDto);
  }

  @Get()
  findAll() {
    return this.projectContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectContentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectContentDto: UpdateProjectContentDto) {
    return this.projectContentService.update(+id, updateProjectContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectContentService.remove(+id);
  }
}
