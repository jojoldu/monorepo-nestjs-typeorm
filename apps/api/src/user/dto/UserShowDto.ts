import { User } from '@app/entity/domain/user/User.entity';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserShowDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _firstName: string;
  @Exclude() private readonly _lastName: string;

  constructor(user: User) {
    this._id = user.id;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get firstName(): string {
    return this._firstName;
  }

  @ApiProperty()
  @Expose()
  get lastName(): string {
    return this._lastName;
  }
}
