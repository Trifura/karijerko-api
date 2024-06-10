import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';
import { User } from '../../user/entities/user.entity';
import { AssistantMessageRole } from './assistant_message.entity';

@Entity('general_message')
export class GeneralMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AssistantMessageRole })
  role: AssistantMessageRole;

  @ManyToOne(() => User, (user) => user.assistantMessages, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  content: string;
}
