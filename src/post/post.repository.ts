import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginateArgs } from '../common/args/paginate.args';
import { SearchArgs } from './args/search-post.args';
import { PostModel } from './models/post.model';
import { PostEntity } from './entities/post.entity';
import { SortArgs } from 'src/common/args/sort.args';
import { Sort } from 'src/common/enums/sort.enum';
import { Reaction } from 'src/common/enums/reaction.enum';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  getPosts(
    paginateOptions: PaginateArgs,
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
  ) {
    const qb = this.getQueryBuider(null, searchOptions, sortArgs);
    return this.getPaginate(qb, paginateOptions);
  }

  getUserPosts(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.getQueryBuider(userId, {}, null);
    return this.getPaginate(qb, paginateArgs);
  }

  private getQueryBuider(
    userId: number,
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
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
    if (sortArgs) {
      switch (sortArgs.sort) {
        case Sort.CREATEDAT:
          qb.orderBy('PostEntity.createdAt', sortArgs.order);
          break;
        case Sort.LIKES:
          qb.addSelect('COUNT(reactions.reaction) as likesCount')
            .leftJoin(
              'PostEntity.reactions',
              'reactions',
              'reactions.reaction = :react',
              { react: Reaction.LIKE },
            )
            .groupBy('PostEntity.id')
            .orderBy('likesCount', sortArgs.order);
          break;
      }
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
