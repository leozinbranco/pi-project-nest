import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personName: string;

  @Column()
  personPhone: string;

  @Column()
  personEmail: string;

  @Column()
  personAddress: string;

  @Column({ default: 1 })
  personActive: number;
}
