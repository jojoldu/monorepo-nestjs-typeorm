import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminController } from './UserAdminController';
import { UserAdminService } from './UserAdminService';
import { EntityService } from '@app/entity';
import { UserEntityRepository } from '@app/entity/user/UserEntityRepository';

describe('AdminController', () => {
  let adminController: UserAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAdminController],
      providers: [UserAdminService, EntityService, UserEntityRepository],
    }).compile();

    adminController = app.get<UserAdminController>(UserAdminController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(adminController.getHello()).toBe('Hello World!');
    });
  });
});
