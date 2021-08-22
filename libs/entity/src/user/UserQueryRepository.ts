import { EntityRepository, Repository } from 'typeorm';
import { User } from './User.entity';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {}
