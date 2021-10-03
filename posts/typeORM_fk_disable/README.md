# TypeORM에서 연관관계 유지한채 FK만 제거하기 (w. NestJS)


```typescript
 @ManyToOne(type => Person, {
        createForeignKeyConstraints: false
    })
```

