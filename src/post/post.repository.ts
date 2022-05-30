import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginateArgs } from '../common/args/paginate.args';
import { SearchArgs } from './args/search-post.args';
import { PostModel } from './models/post.model';
import { PostEntity } from './entities/post.entity';
import { SortArgs } from 'src/common/args/sort.args';
import { Sort } from 'src/common/enums/sort.enum';
import { Reaction } from 'src/common/enums/reaction.enum';
import { FilterArgs } from './args/filter-post.args';
import { Group } from './enums/group.enum';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  getPosts(
    paginateOptions: PaginateArgs,
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
    filterPostArgs: FilterArgs
  ) {
    const qb = this.getQueryBuider(null, searchOptions, sortArgs, filterPostArgs);
    return this.getPaginate(qb, paginateOptions);
  }

  getUserPosts(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.getQueryBuider(userId, {}, null, {});
    return this.getPaginate(qb, paginateArgs);
  }

  private getQueryBuider(
    userId: number,
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
    filterPostArgs: FilterArgs
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
    if(filterPostArgs) {
      if (filterPostArgs.tags) {
        qb.andWhere(':...tags = ANY(tags)', { tags: filterPostArgs.tags });
      }
      if(filterPostArgs.group) {
        switch (filterPostArgs.group) {
          case Group.BEST:
            qb
            .innerJoin(
              'PostEntity.reactions',
              'reactions',
              "reactions.reaction = :react AND reactions.createdAt >= Now() - INTERVAL '24 hours'",
              { react: Reaction.LIKE },
            )
            break;
          case Group.FRESH:
            qb.andWhere("PostEntity.createdAt >= Now() - INTERVAL '24 hours'");
            break;
          case Group.HOT:
            qb
            .innerJoin(
              'PostEntity.commentaries',
              'commentaries',
              "commentaries.createdAt >= Now() - INTERVAL '24 hours'"
            )
            break;
        }
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
