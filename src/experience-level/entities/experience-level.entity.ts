import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('experience_level')
export class ExperienceLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;
}
