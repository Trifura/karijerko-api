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
import { Skill } from '../../skill/entities/skill.entity';
import { BaseEntity } from '../../database/common/BaseEntity';

@Entity('job_ad') // Set the table name
export class JobAd extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  company: string;

  @Column({ name: 'ad_url', nullable: false })
  adUrl: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date;

  @Column({ name: 'num_to_hire', nullable: true })
  numToHire: number;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'show_address', nullable: false, default: false })
  showAddress: boolean;

  @Column({ name: 'will_relocate', nullable: false, default: false })
  willRelocate: boolean;

  @Column({ name: 'hours_min', nullable: true })
  hoursMin: number;

  @Column({ name: 'hours_max', nullable: true })
  hoursMax: number;

  @Column({ name: 'hours_fixed', nullable: true })
  hoursFixed: number;

  @Column('decimal', {
    name: 'pay_min',
    nullable: true,
    precision: 2,
    scale: 2,
  })
  payMin?: number;

  @Column('decimal', {
    name: 'pay_max',
    nullable: true,
    precision: 2,
    scale: 2,
  })
  payMax?: number;

  @Column('decimal', {
    name: 'pay_fixed',
    nullable: true,
    precision: 2,
    scale: 2,
  })
  payFixed?: number;

  @ManyToOne(() => PayRate, (payRateEntity) => payRateEntity.jobAds)
  @JoinColumn({ name: 'pay_rate_id' })
  payRate: PayRate;

  // ManyToMany relationships

  @ManyToMany(() => LocationType, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_location_types',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'location_type_id' },
  })
  locationTypes: LocationType[];

  @ManyToMany(() => JobType, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_job_types',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'job_type_id' },
  })
  jobTypes: JobType[];

  @ManyToMany(() => ScheduleTag, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_schedule_tags',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'schedule_tag_id' },
  })
  scheduleTags: ScheduleTag[];

  @ManyToMany(() => SupplementalPay, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_supplemental_pay',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'supplemental_pay_id' },
  })
  supplementalPay: SupplementalPay[];

  @ManyToMany(() => Benefit, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_benefits',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'benefit_id' },
  })
  benefits: Benefit[];

  @ManyToMany(() => ExperienceLevel, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_experience_levels',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'experience_level_id' },
  })
  experienceLevels: ExperienceLevel[];

  @ManyToMany(() => Skill, {
    cascade: true,
  })
  @JoinTable({
    name: 'job_ad_skills',
    joinColumn: { name: 'job_ad_id' },
    inverseJoinColumn: { name: 'skill_id' },
  })
  skills: Skill[];
}
