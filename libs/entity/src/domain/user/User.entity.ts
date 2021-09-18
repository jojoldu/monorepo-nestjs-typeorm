import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@app/entity/domain/BaseTimeEntity';
import { LocalDateTransformer } from '@app/entity/transformer/LocalDateTransformer';
import { LocalDate, LocalDateTime } from 'js-joda';
import { LocalDateTimeTransformer } from '@app/entity/transformer/LocalDateTimeTransformer';

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

  static byName(firstName: string, lastName: string) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
