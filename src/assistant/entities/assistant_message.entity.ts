import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

export enum AssistantMessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

@Entity('assistant_message')
export class AssistantMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AssistantMessageRole })
  role: AssistantMessageRole;

  // TODO: what to do if company is removed??
  @ManyToOne(() => Company, (company) => company.assistantMessages)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => User, (user) => user.assistantMessages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  content: string;
}
