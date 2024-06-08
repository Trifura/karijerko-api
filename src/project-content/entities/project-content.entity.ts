import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity()
export class ProjectContent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'order_number', nullable: true })
  orderNumber: number;

  @ManyToOne(() => Project, (project) => project.contents, {
    orphanedRowAction: 'delete',
  })
  project: Project;
}
