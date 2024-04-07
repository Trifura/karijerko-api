import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('job_type')
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;
}
