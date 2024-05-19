import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { BaseEntity } from '../../common/BaseEntity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;
}
