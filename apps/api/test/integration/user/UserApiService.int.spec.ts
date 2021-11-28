import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { UserApiService } from '../../../src/user/UserApiService';
import { User } from '@app/entity/domain/user/User.entity';
import { getPgTestTypeOrmModule } from '../../../../../libs/entity/test/getPgTestTypeOrmModule';
import { UserApiQueryRepository } from '../../../src/user/UserApiQueryRepository';
import { HtmlTemplate } from '@app/utils/HtmlTemplate';

describe('UserApiService', () => {
  let userRepository: Repository<User>;
  let sut: UserApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, getPgTestTypeOrmModule()],
      providers: [UserApiService, UserApiQueryRepository, HtmlTemplate],
    }).compile();

    userRepository = module.get('UserRepository');
    sut = module.get<UserApiService>(UserApiService);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('findAll', async () => {
    //given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    await userRepository.save(User.byName(firstName, lastName));

    const users = await sut.findAll();
    expect(users).toHaveLength(1);
    expect(users[0].firstName).toBe(firstName);
    expect(users[0].lastName).toBe(lastName);
  });

  it('findUserName', async () => {
    //given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = await userRepository.save(User.byName(firstName, lastName));

    const userName = await sut.findUserName(user.id);
    expect(userName.firstName).toBe(firstName);
    expect(userName.lastName).toBe(lastName);
  });

  it('email request dto를 가져온다', async () => {
    const data = {
      companyName: '인프랩',
      jobSeeker: '이동욱',
      positionName: '백엔드 개발자',
    };
    const result = await sut.createMailDto(
      'jojoldu',
      'github',
      '제목',
      'sample',
      data,
    );

    expect(result.content).toContain('안녕하세요 이동욱님');
    expect(result.content).toContain(
      '축하합니다! 인프랩의 백엔드 개발자에 최종 합격되었습니다',
    );
    expect(result.content).toContain(
      '인프랩 담당자가 곧 연락을 드릴 예정입니다',
    );
  });
});
