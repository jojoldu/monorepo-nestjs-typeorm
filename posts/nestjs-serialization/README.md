# NestJS에서 응답/요청 객체 직렬화 (Serialization) 하기

저 같은 경우에 최대한 Dto를 불변으로 만들기 위해 setter나 public 필드는 배제하는데요.  
어쩔수 없이 public 필드 (혹은 public setter)를 써야하는 경우 (TypeORM의 Entity 등)를 제외하고는 무조건이다 싶을 정도로 **딱 필요한 정도로만 외부 제공용 메소드**를 만들어서 사용합니다.  

이를 위해서는 Controller에서 사용하는 응답/요청 Dto 객체의 직렬화는 필수로 진행하게 됩니다.    

이번 시간에는 이런 상황등을 대비해서 응답/요청 객체의 직렬화 하는 방법을 진행해보겠습니다.


## 1. 응답 객체 직렬화하기

흔히 소프트웨어 설계에서 이야기하는 응집도(cohesion)와 결합도(coupling)가 있습니다.  
좋은 코드 디자인이라 하면, **높은 응집도 / 낮은 결합도**로 설계해야 하는데요.  

한 객체가 변경이 발생하면 해당 객체에 의존하는 다른 객체들도 변경해야 하기 때문에 이들의 변경 범위를 최소화 하기 위해 캡슐화를 사용합니다.  
이를 위해 일반적으로 **모든 내부 필드는 private으로 직접 접근을 차단**하고, **외부에서의 접근은 지정된 메소드를 통해서만** 진행하도록 하는데요.  

* 이와 관련해서 [이전 글](https://jojoldu.tistory.com/592)을 참고해보시면 좋습니다.

그래서 API 응답용 Dto은 다음과 같이 작성하게 됩니다.

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
    this._orderDateTime = user.orderDateTime.plusDays(1); // (1)
  }

  @ApiProperty() // Swagger용
  @Expose() // (2)
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
    return DateTimeUtil.toString(this._orderDateTime); // (3)
  }
}
```

> 제가 사용하는 날짜 타입은 [js-joda](https://js-joda.github.io/js-joda/) 입니다.

(1) `user.orderDateTime.plusDays(1);`

* Dto 내부에서 쉽게 연산이 가능하도록 **노출용 타입이 아닌**, 원래 타입 그대로를 저장하고 재사용합니다.
* 날짜값의 경우 JSON으로 안전하게 직렬화 하기 위해서는 문자열을 사용하게 되는데, 생성자로 받자마자 바로 문자열로 변환할 경우, 반환하기전 추가 연산이 필요한 경우 다시 날짜타입(`LocalDateTime`)으로 변환해야하는 과정이 필요합니다.
* 그 외 다양한 요소에서 **원본 타입과 노출용 타입은 분리**하는 것이 장점이 많습니다.

(2) `@Expose()`

* `class-transformer` 의 데코레이터로, 직렬화 대상 필드를 지정합니다.
* 여기서는 모든 멤버변수는 `@Exclude()` 로 직렬화 대상에서 제외하고, 온전히 노출에만 사용할 수 있는 getter 메소드에만 `@Expose()` 를 선언합니다.

(3) `DateTimeUtil.toString(this._orderDateTime);`

* API 로 약속된 포맷으로 날짜값을 보내기 위한 전환 작업을 합니다.


### 글로벌 인터셉터 등록

```typescript
export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}
```

```typescript
async function bootstrap() {
  const app = await NestFactory.create(ApiAppModule);
  ....

  setNestApp(app); // 인터셉터 등록 함수 실행

  await app.listen(3000);
}
bootstrap();
```


```typescript
it('/show (GET)', async () => {
  const res = await request(app.getHttpServer()).get('/user/show');

  expect(res.status).toBe(200);
  const data = res.body.data;
  expect(data.firstName).toBe('KilDong');
  expect(data.lastName).toBe('Hong');
  expect(data.orderDateTime).toBe('2021-10-17 00:00:00');
});
```

> 모든 코드는 [Github](https://github.com/jojoldu/monorepo-nestjs-typeorm/tree/master/apps/api)에 있습니다.
## 요청 객체 직렬화하기

### 문자열값을 날짜등 다른 타입으로 변환하기

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


```typescript
it('/signup (POST)', async () => {
  const firstName = 'KilDong';
  const lastName = 'Hong';
  const dateTime = LocalDateTime.of(2021, 10, 17, 0, 0, 0);

  const res = await request(app.getHttpServer())
    .post('/user/signup')
    .send({
      firstName: firstName,
      lastName: lastName,
      orderDateTime: DateTimeUtil.toString(dateTime),
    });

  expect(res.status).toBe(HttpStatus.CREATED);
  const body: ResponseEntity<string> = res.body;
  expect(body.statusCode).toBe(ResponseStatus.OK);

  const user = await userRepository.findOne();
  expect(user.firstName).toBe(firstName);
  expect(user.lastName).toBe(lastName);
  expect(user.orderDateTime.isEqual(dateTime)).toBeTruthy();
});
```
