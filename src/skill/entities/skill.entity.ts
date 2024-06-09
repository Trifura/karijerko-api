import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { BaseEntity } from '../../common/BaseEntity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Project, (project) => project.skills)
  projects: Project[];

  @ManyToMany(() => Company, (company) => company.skills)
  companies: Company[];
}
