import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity() // Base entity with no table name (serves as a base class)
export abstract class BaseProperty extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ name: 'name_en', nullable: false })
  nameEn: string;

  @Column({ name: 'name_hr', nullable: false })
  nameHr: string;
}
