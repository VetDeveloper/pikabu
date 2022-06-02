import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import {
  EntityRepository,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getUserByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }

  findUserOrFail(id: number): Promise<UserEntity> {
    return this.findOneOrFail({ where: { id } });
  }

  getUsers(paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder();
    return this.getPaginate(qb, paginateArgs);
  }

  private getPaginate(
    qb: SelectQueryBuilder<UserEntity>,
    paginateArgs: PaginateArgs,
  ) {
    return paginate<UserModel>(qb, paginateArgs);
  }
}