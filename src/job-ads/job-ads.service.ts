import { Injectable } from '@nestjs/common';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';
import { JobAd } from './entities/job-ad.entity';

@Injectable()
export class JobAdsService {
  create(createJobAdDto: CreateJobAdDto) {
    return new JobAd();
  }

  findAll() {
    return `This action returns all jobAds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobAd`;
  }

  update(id: number, updateJobAdDto: UpdateJobAdDto) {
    return `This action updates a #${id} jobAd`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobAd`;
  }
}
