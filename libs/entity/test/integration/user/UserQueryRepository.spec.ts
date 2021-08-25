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
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
      ],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  it('save', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    const result = await userQueryRepository.findUserName(savedUser.id);
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});
