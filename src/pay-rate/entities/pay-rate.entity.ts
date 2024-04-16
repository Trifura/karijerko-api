import { Entity, OneToMany } from 'typeorm';
import { JobAd } from '../../job-ads/entities/job-ad.entity';
import { BaseProperty } from '../../../common/BaseProperty';

@Entity('pay_rate')
export class PayRate extends BaseProperty {
  @OneToMany(() => JobAd, (jobAd) => jobAd.payRate)
  jobAds: JobAd[];
}
