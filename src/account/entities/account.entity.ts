import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'role', nullable: false })
  role: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'external_type', nullable: true })
  externalType: string;

  @Column({ name: 'external_id', nullable: true })
  externalId: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @ManyToOne(() => Company, (company) => company.accounts)
  company: Company;
}
