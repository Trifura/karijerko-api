import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity('company_size')
export class CompanySize extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'name_hr' })
  nameHr: string;

  @OneToMany(() => Company, (company) => company.companySize)
  companies: Company[];
}
