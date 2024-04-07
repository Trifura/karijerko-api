import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JobAd } from '../../job-ads/entities/job-ad.entity';

@Entity('pay_rate')
export class PayRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;

  @OneToMany(() => JobAd, (jobAd) => jobAd.payRate)
  jobAds: JobAd[];
}
