import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schedule_tag')
export class ScheduleTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;
}
