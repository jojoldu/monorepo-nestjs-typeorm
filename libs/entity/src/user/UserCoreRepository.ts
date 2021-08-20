import { EntityRepository, Repository } from 'typeorm';
import { User } from './User.entity';

@EntityRepository(User)
export class UserCoreRepository extends Repository<User> {}
