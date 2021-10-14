import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '@app/entity/domain/BaseTimeEntity';
import { LocalDateTransformer } from '@app/entity/transformer/LocalDateTransformer';
import { LocalDate, LocalDateTime } from 'js-joda';
import { LocalDateTimeTransformer } from '@app/entity/transformer/LocalDateTimeTransformer';
import { Group } from '@app/entity/domain/group/Group.entity';
import { UserStatus } from '@app/entity/domain/user/type/UserStatus';
import { UserStatusTransformer } from '@app/entity/domain/user/type/UserStatusTransformer';

@Entity()
@Index('idx_user_1', ['group'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    transformer: new UserStatusTransformer(),
    nullable: false,
  })
  status: UserStatus;

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
    lazy: true,
    // eager: true,
  })
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  static byName(firstName: string, lastName: string) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }

  updateGroup(group: Group): void {
    this.group = group;
  }
}
