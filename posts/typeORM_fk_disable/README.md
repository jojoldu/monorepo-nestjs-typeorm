# TypeORM에서 연관관계 유지한채 FK만 제거하기 (w. NestJS)

데이터베이스의 FK (Foreign Key) 는 **데이터 일관성을 적용**하여 데이터베이스를 깨끗하게 유지한다는 큰 장점을 가지고 있습니다.  

다만, 서비스의 규모가 커져 테이블당 row가 1억건이 돌파하는 시점부터는 FK는 많은 변경의 병목이 되는데요.  

이유는 1억건 이상일 경우 `alter table` 로는 3~5시간씩 수행 되기 때문입니다.  
이 시간동안 테이블 Lock이 발생할 수 있으며, 이를 회피하기 위해 아래와 같은 여러 장치들이 지원됩니다.

* [Online DDL](https://myinfrabox.tistory.com/61)
* [Percona pt-online-schema-change](https://jojoldu.tistory.com/358)

```typescript
 @ManyToOne(type => Person, {
        createForeignKeyConstraints: false
    })
```
