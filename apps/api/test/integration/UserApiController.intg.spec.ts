import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiAppModule } from '../../src/ApiAppModule';
import { getConnection } from 'typeorm';
import { setNestApp } from '@app/common-config/setNextWebApp';

describe('UserApiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
