import { Test, TestingModule } from '@nestjs/testing';
import { UserApiController } from './UserApiController';
import { UserApiService } from './UserApiService';

describe('ApiController', () => {
  let apiController: UserApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserApiController],
      providers: [UserApiService],
    }).compile();

    apiController = app.get<UserApiController>(UserApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiController.getHello()).toBe('Hello World!');
    });
  });
});
