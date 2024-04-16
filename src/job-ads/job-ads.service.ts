import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobAdDto } from './dto/create-job-ad.dto';
import { UpdateJobAdDto } from './dto/update-job-ad.dto';
import { JobAd } from './entities/job-ad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleTag } from '../schedule-tag/entities/schedule-tag.entity';
import { JobType } from '../job-type/entities/job-type.entity';
import { Benefit } from '../benefit/entities/benefit.entity';
import { SupplementalPay } from '../supplemental-pay/entities/supplemental-pay.entity';
import { LocationType } from '../location-type/entities/location-type.entity';
import { ExperienceLevel } from '../experience-level/entities/experience-level.entity';
import { PayRate } from '../pay-rate/entities/pay-rate.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class JobAdsService {
  constructor(
    @InjectRepository(JobAd)
    private jobAdRepository: Repository<JobAd>,
  ) {}
  async create(createJobAdDto: CreateJobAdDto) {
    const jobAd = this.jobAdRepository.create(createJobAdDto);

    jobAd.scheduleTags = createJobAdDto.scheduleTagIds?.map((id) => {
      return { ...new ScheduleTag(), id };
    });

    jobAd.jobTypes = createJobAdDto.jobTypeIds?.map((id) => {
      return { ...new JobType(), id };
    });

    jobAd.benefits = createJobAdDto.benefitIds?.map((id) => {
      return { ...new Benefit(), id };
    });

    jobAd.supplementalPay = createJobAdDto.supplementalPayIds?.map((id) => {
      return { ...new SupplementalPay(), id };
    });

    jobAd.locationTypes = createJobAdDto.locationTypeIds?.map((id) => {
      return { ...new LocationType(), id };
    });

    jobAd.experienceLevels = createJobAdDto.experienceLevelIds?.map((id) => {
      return { ...new ExperienceLevel(), id };
    });

    jobAd.payRate = { ...new PayRate(), id: createJobAdDto?.payRateId };

    jobAd.skills = createJobAdDto.skillIds?.map((id) => {
      return { ...new Skill(), id };
    });

    return await this.jobAdRepository.save(jobAd);
  }

  async findAll() {
    return await this.jobAdRepository.find({
      relations: [
        'scheduleTags',
        'benefits',
        'skills',
        'experienceLevels',
        'supplementalPay',
        'jobTypes',
        'locationTypes',
        'payRate',
      ],
    });
  }

  async findOne(id: string) {
    return await this.jobAdRepository.findOne({
      where: { id },
      relations: [
        'scheduleTags',
        'benefits',
        'skills',
        'experienceLevels',
        'supplementalPay',
        'jobTypes',
        'locationTypes',
        'payRate',
      ],
    });
  }

  async update(id: string, updateJobAdDto: UpdateJobAdDto) {
    const jobAd = await this.findOne(id);

    if (!jobAd) {
      throw new NotFoundException('Job Ad not found');
    }

    Object.assign(jobAd, updateJobAdDto);

    return await this.jobAdRepository.save(jobAd);
  }

  async remove(id: string) {
    const jobAd = await this.findOne(id);

    if (!jobAd) {
      throw new NotFoundException('Job Ad not found');
    }

    return await this.jobAdRepository.remove(jobAd);
  }
}
