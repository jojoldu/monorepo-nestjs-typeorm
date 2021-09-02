import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/entity/user/User.entity';
import { Repository } from 'typeorm';
import { UserModule } from '@app/entity/user/UserModule';
import { getPgTestTypeOrmModule } from '../../../getPgTestTypeOrmModule';

describe('UserCoreRepository', () => {
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
    }).compile();

    userRepository = module.get('UserRepository');
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  it('Docker PostgreSQL save', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    console.log(`result=${JSON.stringify(savedUser)}`);
    expect(savedUser.id).toBeGreaterThanOrEqual(1);
  });
});
