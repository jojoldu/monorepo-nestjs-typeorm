# 2. NestJS & TypeORM 환경에서 Monorepo 구성하기 - TypeORM 추가하기

[지난 시간](https://jojoldu.tistory.com/594) 에 이어, Monorepo로 구성된 프로젝트에 TypeORM을 추가해보겠습니다.  

## 1. 환경 설정

저 같은 경우 PostgreSQL을 사용할 예정이라 `pg` 를 기반으로 진행하겠습니다.  
  
필요한 패키지들을 먼저 추가합니다.

```bash
yarn add @nestjs/typeorm typeorm pg
```

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

## 2. libs에 Entity 추가

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

```typescript
@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {}
```
