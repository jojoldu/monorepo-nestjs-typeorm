import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@app/entity/domain/BaseTimeEntity';

@Entity()
export class Group extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor() {
    super();
  }

  static of(name: string, description: string) {
    const group = new Group();
    group.name = name;
    group.description = description;
    return group;
  }

  getFullDescription(): string {
    return `${this.name} ${this.description}`;
  }
}
