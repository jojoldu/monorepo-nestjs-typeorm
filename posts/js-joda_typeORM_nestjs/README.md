# js-joda 로 TypeORM Date 타입 대체하기 (with NestJS)

* [js-joda](https://www.npmjs.com/package/js-joda)



```typescript
export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}
```

```typescript
export class LocalDateTransformer implements ValueTransformer {
  // entity -> db로 넣을때
  to(entityValue: LocalDate): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity로 가져올때
  from(databaseValue: Date): LocalDate {
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}
```

```typescript
@Entity()
export class TestEntity extends BaseTimeEntity {
    @Column()
    name: string;

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

    constructor() {
        super();
    }

    static of(
        name: string,
        orderDate: LocalDate,
        orderDateTime: LocalDateTime,
    ): TestEntity {
        const testEntity = new TestEntity();
        testEntity.name = name;
        testEntity.orderDate = orderDate;
        testEntity.orderDateTime = orderDateTime;
        return testEntity;
    }
}
```

```typescript
import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BigintTransformer } from '../transformer/BigintTransformer';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@app/entity/util/DateTimeUtil';

export abstract class BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: new BigintTransformer() })
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date;

  getCreatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.createdAt);
  }

  getUpdatedAtAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.updatedAt);
  }
}
```

```typescript
import { LocalDate } from 'js-joda';

describe('js-joda', () => {
  it('js-joda', () => {
    const now = LocalDate.now();
    const after = now.plusDays(1);
    const before = now.minusDays(1);

    console.log(`now=${now}, after=${after}, before=${before}`);
    expect(now.isBefore(after)).toBeTruthy();
    expect(now.isEqual(after)).toBeFalsy();
    expect(now.isAfter(before)).toBeTruthy();
  });
});
```

```typescript
describe('TestEntityRepository', () => {
    let testEntityRepository: Repository<TestEntity>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TestEntityModule, getPgTestTypeOrmModule()],
        }).compile();

        testEntityRepository = module.get('TestEntityRepository');
        await testEntityRepository.clear();
    });

    afterEach(async () => {
        await getConnection().close();
    });

    it('LocalDate로 필드가 생성된다', async () => {
        // given
        const now = LocalDate.now(); // yyyy-MM-dd
        const nowTime = LocalDateTime.now(); // yyyy-MM-dd HH:mm:ss

        // when
        await testEntityRepository.save(TestEntity.of('name', now, nowTime));
        const result = await testEntityRepository.find();
        const testEntity = result[0];

        // then
        expect(testEntity.id).toBeGreaterThanOrEqual(1);
        expect(testEntity.name).toBe('name');
        expect(testEntity.getCreatedAt().isAfter(nowTime)).toBeTruthy();
        expect(testEntity.orderDate.isEqual(now)).toBeTruthy();
        expect(testEntity.orderDateTime.isEqual(nowTime)).toBeTruthy();
    });
});
```


* [CreateDateColumn with ValueTransformer](https://github.com/typeorm/typeorm/issues/7407)
