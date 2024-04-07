import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('benefit')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;
}
