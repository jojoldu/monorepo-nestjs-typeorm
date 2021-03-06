import { UserApiController } from '../../../src/user/UserApiController';
import { UserApiService } from '../../../src/user/UserApiService';
import { User } from '@app/entity/domain/user/User.entity';
import { instance, mock, when } from 'ts-mockito';
import { getTestLogger } from '../../../../../libs/common-config/test/getTestLogger';

describe('UserApiController', () => {
  let userApiController: UserApiController;

  describe('root', () => {
    it('should return "Hello World!"', () => {
      userApiController = new UserApiController(
        new UserApiService(null, null),
        getTestLogger(),
      );
      expect(userApiController.getHello().data).toBe('Hello World!');
    });

    it('getUsers', async () => {
      const id = 1;
      const user = new User();
      user.id = id;

      const stubUserApiService = new (class extends UserApiService {
        constructor() {
          super(null, null);
        }

        findAll(): Promise<User[]> {
          return Promise.resolve([user]);
        }
      })();

      userApiController = new UserApiController(
        stubUserApiService,
        getTestLogger(),
      );

      const users = await userApiController.getUsers();
      expect(users).toHaveLength(id);
      expect(users[0].id).toBe(id);
    });

    it('getUsers with mockito', async () => {
      const id = 1;
      const user = new User();
      user.id = id;

      const stubUserApiService: UserApiService = mock(UserApiService);
      when(stubUserApiService.findAll()).thenResolve([user]);

      userApiController = new UserApiController(
        instance(stubUserApiService),
        getTestLogger(),
      );

      const users = await userApiController.getUsers();
      expect(users).toHaveLength(id);
      expect(users[0].id).toBe(id);
    });
  });
});
