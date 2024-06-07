import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserLanguage } from '../../user-language/entities/user-language.entity';
import { BaseEntity } from '../../common/BaseEntity';

@Entity()
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.language)
  userLanguages: UserLanguage[];
}
