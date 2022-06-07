import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { UserModel } from './models/user.model';

@EntityRepository(UsersEntity)
export class UserRepository extends Repository<UsersEntity> {
  getUserByEmail(email: string): Promise<UsersEntity> {
    return this.findOne({ where: { email } });
  }

  findUserOrFail(id: number): Promise<UsersEntity> {
    return this.findOneOrFail({ where: { id } });
  }

  getUsers(paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder();
    return this.getPaginate(qb, paginateArgs);
  }

  private getPaginate(
    qb: SelectQueryBuilder<UsersEntity>,
    paginateArgs: PaginateArgs,
  ) {
    return paginate<UserModel>(qb, paginateArgs);
  }
}
