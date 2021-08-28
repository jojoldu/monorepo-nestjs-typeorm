import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/entity/user/User.entity';
import { Repository } from 'typeorm';
import { UserModule } from '@app/entity/user/UserModule';
import { getTestTypeOrmModule } from '../getTestTypeOrmModule';

describe('UserCoreRepository', () => {
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getTestTypeOrmModule()],
    }).compile();

    userRepository = module.get('UserRepository');
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('save', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    console.log(`result=${JSON.stringify(savedUser)}`);
    expect(savedUser.id).toBeGreaterThanOrEqual(1);
  });

  it('save2', async () => {
    const firstName = 'Lee';
    const lastName = 'Donguk2';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    console.log(`result=${JSON.stringify(savedUser)}`);
    expect(savedUser.id).toBeGreaterThanOrEqual(1);
  });
});
