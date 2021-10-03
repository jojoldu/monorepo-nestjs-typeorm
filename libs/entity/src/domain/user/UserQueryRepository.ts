import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { User } from './User.entity';
import { plainToClass } from 'class-transformer';
import { UserName } from '@app/entity/domain/user/UserName';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  async findUserName(userId: number): Promise<UserName> {
    const queryBuilder = createQueryBuilder()
      .select(['user.firstName', 'user.lastName'])
      .from(User, 'user')
      .where(`user.id =:id`, { id: userId });

    const row = await queryBuilder.getOne();
    const result = plainToClass(UserName, row);
    return result;
  }
}
