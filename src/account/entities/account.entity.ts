import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: add unique constraint if providerType is not the same
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'role', nullable: false })
  role: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'provider_type', nullable: true })
  providerType: string;

  @Column({ name: 'provider_id', nullable: true })
  providerId: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @ManyToOne(() => Company, (company) => company.accounts)
  company: Company;
}
