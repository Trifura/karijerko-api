import { Injectable } from '@nestjs/common';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';
import { JobAd } from './entities/job-ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobAdsService {
  constructor(
    @InjectRepository(JobAd)
    private jobAdRepository: Repository<JobAd>,
  ) {}
  async create(createJobAdDto: CreateJobAdDto) {
    const jobAd = this.jobAdRepository.create(createJobAdDto);
    return await this.jobAdRepository.save(jobAd);
  }

  async findAll() {
    return await this.jobAdRepository.find();
  }

  async findOne(id: string) {
    return await this.jobAdRepository.findOne({ where: { id } });
  }

  update(id: string, updateJobAdDto: UpdateJobAdDto) {
    return `This action updates a #${id} jobAd`;
  }

  remove(id: string) {
    return `This action removes a #${id} jobAd`;
  }
}
