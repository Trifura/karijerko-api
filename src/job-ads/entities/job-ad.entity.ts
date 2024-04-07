import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PayRate } from '../../pay-rate/entities/pay-rate.entity';
import { LocationType } from '../../location-type/entities/location-type.entity';
import { JobType } from '../../job-type/entities/job-type.entity';
import { ScheduleTag } from '../../schedule-tag/entities/schedule-tag.entity';
import { SupplementalPay } from '../../supplemental-pay/entities/supplemental-pay.entity';
import { Benefit } from '../../benefit/entities/benefit.entity';
import { ExperienceLevel } from '../../experience-level/entities/experience-level.entity';

@Entity('job_ad') // Set the table name
export class JobAd {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'datetime', nullable: false })
  deadline: Date;

  @Column({ nullable: true })
  numToHire?: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false, default: false })
  showAddress: boolean;

  @Column({ nullable: false, default: false })
  willRelocate: boolean;

  @Column({ nullable: true })
  hoursMin?: number;

  @Column({ nullable: true })
  hoursMax?: number;

  @Column({ nullable: true })
  hoursFixed?: number;

  @Column({ nullable: true })
  payMin?: number;

  @Column({ nullable: true })
  payMax?: number;

  @Column({ nullable: true })
  payFixed?: number;

  @ManyToOne(() => PayRate, (payRateEntity) => payRateEntity.jobAds)
  @JoinColumn({ name: 'pay_rate_id' })
  payRate: PayRate;

  // ManyToMany relationships

  @ManyToMany(() => LocationType) // Replace with your LocationType entity
  @JoinTable({
    name: 'job_ad_location_types',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'location_type_id' },
  })
  locationTypes: LocationType[];

  @ManyToMany(() => JobType) // Replace with your JobType entity
  @JoinTable({
    name: 'job_ad_job_types',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'job_type_id' },
  })
  jobTypes: JobType[];

  @ManyToMany(() => ScheduleTag) // Replace with your ScheduleTag entity
  @JoinTable({
    name: 'job_ad_schedule_tags',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'schedule_tag_id' },
  })
  scheduleTags: ScheduleTag[];

  @ManyToMany(() => SupplementalPay) // Replace with your SupplementalPay entity
  @JoinTable({
    name: 'job_ad_supplemental_pay',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'supplemental_pay_id' },
  })
  supplementalPay: SupplementalPay[];

  @ManyToMany(() => Benefit) // Replace with your Benefit entity
  @JoinTable({
    name: 'job_ad_benefits',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'benefit_id' },
  })
  benefits: Benefit[];

  @ManyToMany(() => ExperienceLevel) // Replace with your ExperienceLevel entity
  @JoinTable({
    name: 'job_ad_experience_levels',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'experience_level_id' },
  })
  experienceLevels: ExperienceLevel[];
}
