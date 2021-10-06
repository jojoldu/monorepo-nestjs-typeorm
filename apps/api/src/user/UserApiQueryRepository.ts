import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserName } from '@app/entity/domain/user/UserName';
import { User } from '@app/entity/domain/user/User.entity';

@EntityRepository(User)
export class UserApiQueryRepository extends Repository<User> {
  async findUserName(userId: number): Promise<UserName> {
    const row = await this.findOneByUserId(userId);
    return plainToClass(UserName, row);
  }

  private async findOneByUserId(userId: number) {
    const queryBuilder = createQueryBuilder()
      .select(['user.firstName', 'user.lastName'])
      .from(User, 'user')
      .where(`user.id =:id`, { id: userId });

    return await queryBuilder.getRawOne();
  }
}
