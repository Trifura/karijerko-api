import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: any, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(req.account, createProjectDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.projectService.findAll(req.account);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(req.account, +id, updateProjectDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.projectService.remove(req.account, +id);
  }
}
