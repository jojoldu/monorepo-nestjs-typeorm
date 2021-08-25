import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { User } from './User.entity';
import { plainToClass } from 'class-transformer';
import { UserName } from '@app/entity/user/UserName';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  async findUserName(userId: number): Promise<UserName> {
    const queryBuilder = createQueryBuilder()
      .select(['user.firstName AS firstName', 'user.lastName AS lastName'])
      .from(User, 'user')
      .where(`user.id =:id`, { id: userId });

    const row = await queryBuilder.getRawOne();
    console.log(`id=${userId}, ${JSON.stringify(row)}`);
    return plainToClass(UserName, row, { excludeExtraneousValues: true });
    // return Object.assign(UserName, row);
  }
}
