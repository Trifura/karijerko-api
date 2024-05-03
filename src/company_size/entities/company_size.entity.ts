import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity('company_size')
export class CompanySize {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'name_hr' })
  nameHr: string;

  @OneToMany(() => Company, (company) => company.companySize)
  companies: Company[];
}
