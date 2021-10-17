# NestJS에서 요청/응답 직렬화 하기

NestJS 를 통해 API를 생성하기 위해서는

```typescript
export class UserShowDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _firstName: string;
  @Exclude() private readonly _lastName: string;
  @Exclude() private readonly _orderDateTime: LocalDateTime;

  constructor(user: User) {
    this._id = user.id;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._orderDateTime = user.orderDateTime;
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

  @ApiProperty()
  @Expose()
  get orderDateTime(): string {
    return DateTimeUtil.toString(this._orderDateTime);
  }
}
```
