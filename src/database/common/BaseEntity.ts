import { Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() // Base entity with no table name (serves as a base class)
export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
