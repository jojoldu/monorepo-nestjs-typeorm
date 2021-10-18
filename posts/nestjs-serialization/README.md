# NestJS에서 요청/응답 객체 직렬화 (Serialization) 하기

저 같은 경우에 최대한 Dto를 불변으로 만들기 위해 setter나 public 필드는 배제하는데요.  
어쩔수 없이 public 필드 (혹은 public setter)를 써야하는 경우 (TypeORM의 Entity 등)를 제외하고는 무조건이다 싶을 정도로 **딱 필요한 정도로만 외부 제공용 메소드**를 만들어서 사용합니다.  

이를 위해서는 Controller에서 사용하는 응답/요청 Dto 객체의 직렬화는 필수인데요.  

이번 시간에는 각 상황에 맞게 직렬화 하는 방법을 진행해보겠습니다.


## 응답 객체 직렬화하기


같은 필드이지만, 내부 연산을 위한 것과 외부 노출을 위한 형태는 서로 다를때가 있습니다.  

이를테면 다음과 같은 경우입니다.  


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
    this._orderDateTime = user.orderDateTime.plusDays(1);
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

## 요청 객체 직렬화하기

### 날짜 값등 다른 타입으로 변환하기

```typescript
export class UserSignupReq {
  ...

  @Expose()
  @Transform((property) => {
    return DateTimeUtil.toLocalDateTimeBy(property.value + '');
  })
  orderDateTime: LocalDateTime;
  ...
}
```
