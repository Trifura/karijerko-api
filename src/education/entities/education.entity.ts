import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institution: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ name: 'field_of_study', nullable: true })
  fieldOfStudy: string;

  @Column({ name: 'start_year' })
  startYear: number;

  @Column({ name: 'end_year' })
  endYear: number;

  @ManyToOne(() => User, (user) => user.educations)
  user: User;
}
