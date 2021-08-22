import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepository } from '@app/entity/user/UserQueryRepository';
import { User } from '@app/entity/user/User.entity';

describe('UserCoreRepository', () => {
  let repository: UserQueryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQueryRepository],
    }).compile();

    repository = module.get<UserQueryRepository>(UserQueryRepository);
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
