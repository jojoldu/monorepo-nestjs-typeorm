import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@app/entity/domain/user/User.entity';
import { createQueryBuilder, getConnection, Repository } from 'typeorm';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { getPgTestTypeOrmModule } from '../../getPgTestTypeOrmModule';
import { UserQueryRepository } from '@app/entity/domain/user/UserQueryRepository';
import { GroupModule } from '@app/entity/domain/group/GroupModule';
import { Group } from '@app/entity/domain/group/Group.entity';

describe('UserQueryRepository', () => {
  let groupRepository: Repository<Group>;
  let userRepository: Repository<User>;
  let userQueryRepository: UserQueryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, GroupModule, getPgTestTypeOrmModule()],
    }).compile();

    userQueryRepository = module.get<UserQueryRepository>(UserQueryRepository);
    userRepository = module.get('UserRepository');
    groupRepository = module.get('GroupRepository');
  });

  afterEach(async () => {
    await userRepository.clear();
    await groupRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('save', async () => {
    // given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;

    // when
    const savedUser = await userRepository.save(user);

    // then
    expect(savedUser.id).toBeGreaterThanOrEqual(1);
  });

  it('findUserName', async () => {
    // given
    const firstName = 'Lee';
    const lastName = 'Donguk';
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    const savedUser = await userRepository.save(user);

    // when
    const result = await userQueryRepository.findUserName(savedUser.id);

    // then
    expect(result.getFullName()).toBe(`${firstName} ${lastName}`);
  });

  it('user와 group 연관관계를 검증한다', async () => {
    //given
    const groupName = 'testGroup';
    const group = await groupRepository.save(Group.of(groupName, 'desc'));
    const firstName = 'Donguk';
    const user = User.byName(firstName, 'lee');
    user.updateGroup(group);

    await userRepository.save(user);

    //when
    const savedUser = await userRepository.findOne({ firstName });
    const savedGroup = await savedUser.group;

    //then
    expect(savedUser.firstName).toBe(firstName);
    expect(savedGroup.name).toBe(groupName);
  });

  it('User and Group Join Query', async () => {
    //given
    const groupName = 'testGroup';
    const group = await groupRepository.save(Group.of(groupName, 'desc'));
    const firstName = 'donguk';
    const user = User.byName(firstName, 'lee');
    user.updateGroup(group);

    await userRepository.save(user);

    //when
    const savedUser = await createQueryBuilder(User, 'user')
      .innerJoinAndSelect('user.group', 'group')
      .where('user.firstName = :firstName', { firstName })
      .getOne();

    console.log(JSON.stringify(savedUser));

    //then
    expect(savedUser.firstName).toBe(firstName);
    expect(savedUser.group.name).toBe(groupName);
  });

  it('user와 group lazy load', async () => {
    //given
    const groupName = 'testGroup';
    const group = await groupRepository.save(Group.of(groupName, 'desc'));
    const firstName = 'donguk';
    const user = User.byName(firstName, 'lee');
    user.updateGroup(group);

    await userRepository.save(user);

    //when
    const savedUser = await userRepository.findOne({ firstName });
    const savedGroup = await savedUser.group;

    console.log(`savedGroup = ${JSON.stringify(savedGroup)}`);

    //then
    expect(savedUser.firstName).toBe(firstName);
    expect(savedGroup.name).toBe(groupName);
  });
});
