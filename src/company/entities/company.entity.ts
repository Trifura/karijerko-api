import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Industry } from '../../industry/entities/industry.entity';
import { CompanySize } from '../../company_size/entities/company_size.entity';
import { OfficeLocation } from '../../office_location/entities/office_location.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => Industry, (industry) => industry.companies)
  industry: Industry;

  @ManyToOne(() => CompanySize, (companySize) => companySize.companies)
  companySize: CompanySize;

  @Column({ nullable: true })
  headquarters: string;

  @Column({ type: 'timestamptz', nullable: true })
  foundedAt: Date;

  @Column({ nullable: true })
  specialties: string;

  @OneToMany(() => OfficeLocation, (officeLocation) => officeLocation.company)
  officeLocations: OfficeLocation[];
}
