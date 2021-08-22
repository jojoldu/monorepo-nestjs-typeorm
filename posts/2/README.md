# 2. NestJS & TypeORM 환경에서 Monorepo 구성하기 - TypeORM 추가하기


```bash
yarn add @nestjs/typeorm typeorm pg
```

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
export class UserCoreRepository extends Repository<User> {}
```
