# 2. NestJS & TypeORM 환경에서 Monorepo 구성하기 - TypeORM 추가하기

[지난 시간](https://jojoldu.tistory.com/594) 에 이어, Monorepo로 구성된 프로젝트에 TypeORM을 추가해보겠습니다.  

## 1. 환경 설정

저 같은 경우 PostgreSQL을 사용할 예정이라 `pg` 를 기반으로 진행하겠습니다.  
  
필요한 패키지들을 먼저 추가합니다.

```bash
yarn add @nestjs/typeorm typeorm pg typeorm-naming-strategies class-transformer
```

* `typeorm-naming-strategies`
  * [TypeORM에서 Camelcase 필드를 Snake 컬럼에 매핑하기](https://jojoldu.tistory.com/568) 를 위해 사용됩니다. 
* `class-transformer`
  * Entity Json을 Dto Instance으로 편하게 변환하기 위해 사용합니다.

그리고 TypeORM과 연동되어 로컬에서 실행할 PostgreSQL DB를 위해 `docker-compose.yml` 파일을 아래와 같이 생성합니다.

> 도커를 안쓰신다면 로컬에 본인이 원하는 DB를 설치하시면 됩니다.

```yaml
version: '3.8'

services:
  db:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=test
      - POSTGRES_USER=test
      - POSTGRES_PASSWORD=test
      - POSTGRES_INITDB_ARGS=--encoding=UTF-8
```

완성된 `docker-compose.yml` 를 기반으로 DB를 실행해둡니다.

```bash
docker-compose up
```

> 다음편에서, 도커나 별도의 로컬 DB 실행없이 메모리 DB로 빠르게 TypeORM 을 테스트 하는 방법을 소개드립니다.

## 2. libs에 Entity 추가

Entity는 이 프로젝트의 핵심 비지니스 로직을 가지고 있는 객체들이 모여있는 모듈입니다.  
그리고 이 핵심 객체들을 각 하위 모듈인 API / Admin이 사용하는 것이 현 프로젝트 구조인데요.

![module](./images/module.png)

이에 맞게 `libs`에 `user` 디렉토리를 추가하겠습니다.

![entity1](./images/entity1.png)

여러 Entity 클래스들을 만들 수 있겠지만,  
여기서는 간단하게 User Entity 만 기준으로 해서 진행하겠습니다.  
  
User Entity와 Repository 클래스를 **Data Mapper 패턴**으로 만들겠습니다.  

![user-module](./images/user-module.png)

**libs/entity/src/user/User.entity**

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
```

**libs/entity/src/user/UserQueryRepository.entity**

```typescript
@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
    async findUserName(userId: number): Promise<UserName> {
        const queryBuilder = createQueryBuilder()
            .select(['user.firstName', 'user.lastName'])
            .from(User, 'user')
            .where(`user.id =:id`, { id: userId });

        const row = await queryBuilder.getOne();
        return plainToClass(UserName, row);
    }
}
```

**libs/entity/src/user/UserName**

```typescript
export class UserName {
  firstName: string;
  lastName: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

* `getFullName`
  * `FullName`의 경우 `User` 에서 꼭 필요한 항목은 아니지만, 특정 화면/API에서는 필요한 항목이기 때문에 이처럼 별도의 Getter를 통해 생성합니다. 

**libs/entity/src/user/UserModule**

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User, UserQueryRepository])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class UserModule {}
```

여기서는 DataMapper 패턴을 사용하는데요.  
  
이미 다들 아시겠지만, TypeORM에서는 2가지 패턴을 지원합니다.

* Active Record 패턴
* Data Mapper 패턴

초기의 **작은 App에서는** 어느 패턴이여도 상관없지만,  
유지보수와 확장성을 고려하면 Data Mapper를 선호하게 됩니다.  
  
Data Mapper 패턴이 Active Record 패턴에 비해 가장 큰 차이점은, **도메인을 Persistence 와 완전히 분리**한다는 것입니다.  
이를테면 Active Record 패턴은 **Model을 테이블로 바라봅니다**

```typescript
const ticket = Ticket.find(id);
ticket.cancel();
```

* Ticket 클래스는 마치 **테이블처럼** 여러개의 row 중 하나를 찾아낼 수 있는 장소이며
* 단일 객체의 행위를 관리하기도 합니다.

반면에 DataMapper 패턴은 **Model을 도메인 객체로 바라봅니다**

```typescript
const ticket = ticketRepostiroy.find(id);
ticket.cancel();
```

* 데이터베이스에 대한 조회는 Repository에서 처리후
* 조회 이후, 해당 Ticket 도메인에 대한 행위 (`Method`) 와 상태 (`Field`) 를 가집니다.

즉, Domain 객체와 Mapper를 분리해서 **데이터베이스를 Domain 객체에서 격리** 시킵니다.  
이는 Entity 클래스가 **데이터베이스에 대해 전혀 이해할 필요가 없음** (의존성이 없는) 을 의미하기 때문에 **Domain clean**을 할 수 있게 됩니다.  
이로인해 비지니스 로직이 복잡한 경우 상대적으로 유지보수 하기가 쉬워집니다.     
  
반대로 Active Record 패턴의 경우 서비스 규모가 커질수록 데이터베이스 쿼리에 대한 코드와 도메인 객체 코드가 모두 묶여있어, 코드 복잡도가 굉장히 높아집니다.  
  
이외에도, 아래와 같은 **확장의 가능성**에 있어서도 장점을 얻습니다.

* TypeORM이 더이상 발전하지 못해, 다른 ORM을 사용해야할 경우
* 데이터 저장소가 RDBMS가 아니라 MongoDB, Redis, DynamoDB등으로 전환이 필요할 때
* 회원을 담당하는 로직 자체가 마이크로 서비스로 별도의 서비스로 분리되어 API 통신으로 진행해야할 경우

등등 다양한 상황에서 Active Record와 같이 특정 ORM, RDBMS에 종속적인 경우는 운영 & 확장에서 어려움을 겪습니다.  
  
일정 규모 이상의 서비스가 되면, 웹 서비스는 더이상 **데이터베이스와 특정 ORM에 종속적이지 않습니다**.  
그래서 저 같은 경우에는 Data Mapper 패턴을 상당히 선호하게 됩니다.  
  
자 이제 Entity 모듈만 한번 테스트해보겠습니다.

## 3. 테스트

먼저 위에서 만들어두었던 `docker-compose` 를 실행해둡니다.

> 다음편에서 `sqlite`를 통해 별도의 도커 실행 없이 단위 테스트를 진행하겠습니다.

그리고 로컬에서 실행한 도커 PostgreSQL에 접근하기 위해 Config 파일을 하나 만들어두겠습니다.  
(테스트와 실제 로컬에서 실행하는 것의 환경을 분리합니다.)

![pg-config](./images/pg-config.png)

**libs/entity/getPgTestTypeOrmModule**

```typescript
export function getPgTestTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
```

위 테스트 Config를 이제 테스트 코드에서도 동일하게 사용해봅니다.

![test-func](./images/test-func.png)

**libs/entity/test/unit/user/UserRepository.pg.spec.ts**

```typescript
describe('UserQueryRepository', () => {
  let userRepository: Repository<User>;
  let userQueryRepository: UserQueryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
  });

  afterEach(async () => {
    await userRepository.clear();
    await getConnection().close();
  });

  it('save', async () => {
    // given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;

    // when
    const savedUser = await userRepository.save(user);

    // then
    expect(savedUser.id).toBeGreaterThanOrEqual(1);
  });

  it('findUserName', async () => {
    // given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    await userRepository.save(user);

    // when
    const result = await userQueryRepository.findUserName(savedUser.id);

    // then
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});
```

간단한 `save` 와 `findUserName` 모두 테스트가 통과 되는 것을 확인합니다.

![test-result1](./images/test-result1.png)

## 4. 마무리

이번 시간에는 실제 도커를 통해 PostgreSQL을 실행후 TypeORM 기능을 검증해보았습니다.  
다음 편에서는 매번 이렇게 도커를 실행해야지 테스트를 돌리는게 아니라,  
간단한 인메모리 DB를 사용해서 별도의 도커 실행 없이 테스트를 수행하는 방법을 진행해보겠습니다.
