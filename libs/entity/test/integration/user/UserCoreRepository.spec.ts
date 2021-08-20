import { Test, TestingModule } from '@nestjs/testing';
import { UserCoreRepository } from '@app/entity/user/UserCoreRepository';
import { User } from '@app/entity/user/User.entity';

describe('UserCoreRepository', () => {
  let repository: UserCoreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCoreRepository],
    }).compile();

    repository = module.get<UserCoreRepository>(UserCoreRepository);
  });

  it('save', async () => {
    const firstName = 'jojoldu';
    const user = new User();
    user.firstName = firstName;
    await repository.save(user);

    const result = await repository.find();
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe(firstName);
  });
});
