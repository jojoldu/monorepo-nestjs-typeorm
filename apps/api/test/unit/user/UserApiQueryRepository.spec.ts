import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/entity/domain/user/User.entity';
import { getConnection, Repository } from 'typeorm';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { UserApiQueryRepository } from '../../../src/user/UserApiQueryRepository';
import { getPgTestTypeOrmModule } from '../../../../../libs/entity/test/getPgTestTypeOrmModule';
import { UserApiService } from '../../../src/user/UserApiService';

describe('UserApiQueryRepository', () => {
  let userApiQueryRepository: UserApiQueryRepository;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
      providers: [UserApiQueryRepository, UserApiService],
    }).compile();

    userApiQueryRepository = module.get<UserApiQueryRepository>(
      UserApiQueryRepository,
    );
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

    const result = await userApiQueryRepository.findUserName(savedUser.id);
    console.log(`result=${JSON.stringify(result)}`);
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });
});
