import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity()
export class ProjectContent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'order_number' })
  orderNumber: number;

  @ManyToOne(() => Project, (project) => project.contents)
  project: Project;
}
