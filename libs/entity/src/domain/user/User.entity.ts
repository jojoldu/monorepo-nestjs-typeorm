import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '@app/entity/domain/BaseTimeEntity';
import { LocalDateTransformer } from '@app/entity/transformer/LocalDateTransformer';
import { LocalDate, LocalDateTime } from 'js-joda';
import { LocalDateTimeTransformer } from '@app/entity/transformer/LocalDateTimeTransformer';
import { Group } from '@app/entity/domain/group/Group.entity';

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

  @Column({
    type: 'timestamptz',
    transformer: new LocalDateTransformer(),
    nullable: true,
  })
  orderDate: LocalDate;

  @Column({
    type: 'timestamptz',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
  })
  orderDateTime: LocalDateTime;

  @ManyToOne(() => Group, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  static byName(firstName: string, lastName: string) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
