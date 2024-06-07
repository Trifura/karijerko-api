import { BaseEntity } from '../../common/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from '../../language/entities/language.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserLanguage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.languages)
  user: User;

  @ManyToOne(() => Language, (language) => language.userLanguages)
  language: Language;

  @Column()
  proficiency: string;
}
