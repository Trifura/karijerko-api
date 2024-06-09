import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Industry } from '../../industry/entities/industry.entity';
import { CompanySize } from '../../company_size/entities/company_size.entity';
import { OfficeLocation } from '../../office_location/entities/office_location.entity';
import { BaseEntity } from '../../common/BaseEntity';
import { Account } from '../../account/entities/account.entity';
import { AssistantMessage } from '../../assistant/entities/assistant_message.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity('company')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Account, (account) => account.company)
  accounts: Account[];

  @Column({ nullable: false })
  name: string;

  // TODO: set to nullable false and unique true
  @Column({ nullable: true })
  slug: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  headquarters: string;

  @Column({ name: 'founded_at', type: 'timestamptz', nullable: true })
  foundedAt: Date;

  @Column({ nullable: true })
  specialties: string;

  @ManyToOne(() => Industry, (industry) => industry.companies)
  industry: Industry;

  @ManyToOne(() => CompanySize, (companySize) => companySize.companies)
  companySize: CompanySize;

  @OneToMany(() => OfficeLocation, (officeLocation) => officeLocation.company)
  officeLocations: OfficeLocation[];

  @OneToMany(
    () => AssistantMessage,
    (assistantMessage) => assistantMessage.company,
  )
  assistantMessages: AssistantMessage[];

  @ManyToMany(() => Skill, (skill) => skill.companies)
  @JoinTable()
  skills: Skill[];

  skillCount: number;
}
