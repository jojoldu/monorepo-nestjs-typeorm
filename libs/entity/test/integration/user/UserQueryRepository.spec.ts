import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepository } from '@app/entity/user/UserQueryRepository';
import { User } from '@app/entity/user/User.entity';
import { Repository } from 'typeorm';
import { UserModule } from '@app/entity/user/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

describe('UserCoreRepository', () => {
  let userQueryRepository: UserQueryRepository;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'test',
          entities: [User],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
      ],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
  });

  it('save', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    await userRepository.save(user);

    const result = await userQueryRepository.findUserName(1);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe(`${firstName} ${lastName}`);
  });
});
