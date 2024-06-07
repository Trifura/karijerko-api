import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'is_primary' })
  isPrimary: boolean;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @OneToMany(() => Project, (project) => project.profile)
  projects: Project[];

  // TODO: add computed field skills that has list of unique skills from all projects.
}
