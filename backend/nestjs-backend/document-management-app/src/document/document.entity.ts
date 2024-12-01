import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;
}
