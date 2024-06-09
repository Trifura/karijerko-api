import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { ProjectContent } from '../../project-content/entities/project-content.entity';
import { BaseEntity } from '../../common/BaseEntity';
import { Exclude } from 'class-transformer';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Exclude()
  @ManyToOne(() => Profile, (profile) => profile.projects, {
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @ManyToMany(() => Skill, (skill) => skill.projects)
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => ProjectContent, (projectContent) => projectContent.project)
  contents: ProjectContent[];
}
