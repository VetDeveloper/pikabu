import {
  EntityRepository,
  Repository,
} from 'typeorm';
import { UserEntity } from './entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getUserByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }

  findUserOrFail(id: number): Promise<UserEntity> {
    return this.findOneOrFail({ where: { id } });
  }
}