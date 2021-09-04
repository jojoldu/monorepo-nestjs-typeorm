import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepository } from '@app/entity/user/UserQueryRepository';
import { User } from '@app/entity/user/User.entity';
import { getConnection, Repository } from 'typeorm';
import { UserModule } from '@app/entity/user/UserModule';
import { getSqliteTestTypeOrmModule } from '../../../getSqliteTestTypeOrmModule';

describe('UserQueryRepository', () => {
  let userQueryRepository: UserQueryRepository;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getSqliteTestTypeOrmModule()],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
  });

  beforeEach(async () => {
    await userRepository.clear();
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
