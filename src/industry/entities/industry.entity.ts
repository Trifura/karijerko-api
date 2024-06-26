import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity('industry')
export class Industry extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'slug', unique: true })
  slug: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'name_hr' })
  nameHr: string;

  @OneToMany(() => Company, (company) => company.industry)
  companies: Company[];
}
