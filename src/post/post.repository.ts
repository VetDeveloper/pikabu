import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginateArgs } from './args/paginate.args';
import { SearchArgs } from './args/search-post.args';
import { PostModel } from './models/post.model';
import { PostEntity } from './entities/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  getPosts(paginateOptions: PaginateArgs, searchOptions: SearchArgs) {
    const qb = this.getQueryBuider(null, searchOptions);
    return this.getPaginate(qb, paginateOptions);
  }

  getUserPosts(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.getQueryBuider(userId, {});
    return this.getPaginate(qb, paginateArgs);
  }

  private getQueryBuider(
    userId: number,
    searchOptions: SearchArgs,
  ) {
      const qb = this.createQueryBuilder();
      if (userId) {
          qb.andWhere('PostEntity.userId = :userId', {
            userId: userId,
          });
      }
      if (searchOptions.searchValue) {
        qb.andWhere('title LIKE :searchValue', {
          searchValue: `%${searchOptions.searchValue}%`,
        });
      }
      return qb;
  }

  private getPaginate(
    qb: SelectQueryBuilder<PostEntity>,
    paginateArgs: PaginateArgs,
  ) {
    return paginate<PostModel>(qb, paginateArgs);
  }
}
