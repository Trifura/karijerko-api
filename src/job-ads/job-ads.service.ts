import { Injectable } from '@nestjs/common';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';

@Injectable()
export class JobAdsService {
  create(createJobAdDto: CreateJobAdDto) {
    return 'This action adds a new jobAd';
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
