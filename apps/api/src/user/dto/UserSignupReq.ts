import { LocalDateTime } from 'js-joda';
import { Expose, Transform } from 'class-transformer';
import { DateTimeUtil } from '@app/entity/util/DateTimeUtil';
import { User } from '@app/entity/domain/user/User.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignupReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @Transform((property) => {
    return DateTimeUtil.toLocalDateTimeBy(property.value + '');
  })
  orderDateTime: LocalDateTime;

  constructor() {}

  static of(
    firstName: string,
    lastName: string,
    orderDateTime: LocalDateTime,
  ): UserSignupReq {
    const dto = new UserSignupReq();
    dto.firstName = firstName;
    dto.lastName = lastName;
    dto.orderDateTime = orderDateTime;

    return dto;
  }

  toEntity(): User {
    return User.signup(this.firstName, this.lastName, this.orderDateTime);
  }
}
