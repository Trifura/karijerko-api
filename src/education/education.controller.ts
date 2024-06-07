import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: any, @Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(req.account, createEducationDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.educationService.findAll(req.account);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.educationService.findOne(req.account, +id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(req.account, +id, updateEducationDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.educationService.remove(req.account, +id);
  }
}
