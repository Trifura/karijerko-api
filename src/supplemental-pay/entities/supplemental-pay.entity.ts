import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('supplemental_pay')
export class SupplementalPay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;
}
