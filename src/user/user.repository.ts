import {
  EntityRepository,
  Repository,
} from 'typeorm';
import { UserModel } from './models/user.model';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getUserByEmail(email: string): Promise<UserModel> {
    return this.findOne({ where: { email } });
  }

  findUserOrFail(id: number) {
    return this.findOneOrFail({ where: { id } });
  }
}