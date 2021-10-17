import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiAppModule } from '../../src/ApiAppModule';
import { getConnection, Repository } from 'typeorm';
import { setNestApp } from '@app/common-config/setNextWebApp';
import { User } from '@app/entity/domain/user/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserApiController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(getRepositoryToken(User));

    setNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/show (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/user/show');

    expect(res.status).toBe(200);
    const data = res.body.data;
    console.log(`>>>>>>>>>>>>>> response body = ${JSON.stringify(data)}`);
    expect(data.firstName).toBe('KilDong');
    expect(data.lastName).toBe('Hong');
    expect(data.orderDateTime).toBe('2021-10-17 00:00:00');
  });
});
