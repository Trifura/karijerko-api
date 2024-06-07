import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { BaseEntity } from '../../common/BaseEntity';
import { Exclude } from 'class-transformer';
import { AssistantMessage } from '../../assistant/entities/assistant_message.entity';
import { UserLanguage } from '../../user-language/entities/user-language.entity';
import { Education } from '../../education/entities/education.entity';
import { Profile } from '../../profile/entities/profile.entity';

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

  @Column({ nullable: true })
  city: string;

  @OneToMany(
    () => AssistantMessage,
    (assistantMessage) => assistantMessage.user,
  )
  assistantMessages: AssistantMessage[];

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  languages: UserLanguage[];

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
