import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobAdsService } from './job-ads.service';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';

@Controller('job-ads')
export class JobAdsController {
  constructor(private readonly jobAdsService: JobAdsService) {}

  @Post()
  create(@Body() createJobAdDto: CreateJobAdDto) {
    return this.jobAdsService.create(createJobAdDto);
  }

  @Get()
  findAll() {
    return this.jobAdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobAdsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobAdDto: UpdateJobAdDto) {
    return this.jobAdsService.update(+id, updateJobAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobAdsService.remove(+id);
  }
}
