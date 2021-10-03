import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepository } from '@app/entity/domain/user/UserQueryRepository';
import { User } from '@app/entity/domain/user/User.entity';
import { getConnection, Repository } from 'typeorm';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { getPgTestTypeOrmModule } from '../../getPgTestTypeOrmModule';

describe('UserQueryRepository', () => {
  let userQueryRepository: UserQueryRepository;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('save', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    const result = await userQueryRepository.findUserName(savedUser.id);
    console.log(`result=${JSON.stringify(result)}`);
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });

  it('save2', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk2';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    const result = await userQueryRepository.findUserName(savedUser.id);
    console.log(`result=${JSON.stringify(result)}`);
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});
