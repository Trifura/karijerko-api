import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity('industry')
export class Industry {
  @PrimaryColumn({ name: 'id' })
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
