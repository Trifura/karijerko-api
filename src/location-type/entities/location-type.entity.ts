import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('location_type')
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  nameEn: string;

  @Column({ nullable: false })
  nameHr: string;
}
