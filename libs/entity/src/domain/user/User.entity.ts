import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@app/entity/domain/BaseTimeEntity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  static byName(firstName: string, lastName: string) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
