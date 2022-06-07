import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginateArgs } from '../common/args/paginate.args';
import { SearchArgs } from './args/search-post.args';
import { PostModel } from './models/post.model';
import { PostsEntity } from './entities/posts.entity';
import { SortArgs } from 'src/common/args/sort.args';
import { SortVariant } from 'src/common/enums/sort-variant.enum';
import { Reaction } from 'src/common/enums/reaction.enum';
import { FilterArgs } from './args/filter-post.args';
import { PostsGroup } from './enums/posts-group.enum';

@EntityRepository(PostsEntity)
export class PostsRepository extends Repository<PostsEntity> {
  getPosts(
    paginateOptions: PaginateArgs,
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
    filterPostArgs: FilterArgs,
  ) {
    const qb = this.getQueryBuider(searchOptions, sortArgs, filterPostArgs);
    return this.getPaginate(qb, paginateOptions);
  }

  getUserPosts(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder();
    qb.andWhere('PostsEntity.userId = :userId', {
      userId: userId,
    });
    return this.getPaginate(qb, paginateArgs);
  }

  private getQueryBuider(
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
    filterPostArgs: FilterArgs,
  ) {
    const qb = this.createQueryBuilder();
    if (filterPostArgs.tags) {
      for(let i=0; i<filterPostArgs.tags.length; i++) {
        qb.andWhere(':tag = ANY(tags)', { tag: filterPostArgs.tags[i] });
      }
    }
    if (filterPostArgs.group) {
      switch (filterPostArgs.group) {
        case PostsGroup.BEST:
          qb.addSelect('COUNT(reactions.id) as group_count');
          qb.innerJoin(
            'PostsEntity.reactions',
            'reactions',
            "reactions.reaction = :react AND reactions.createdAt >= Now() - INTERVAL '24 hours'",
            { react: Reaction.LIKE },
          ).groupBy('PostsEntity.id');
          break;
        case PostsGroup.FRESH:
          qb.andWhere("PostsEntity.createdAt >= Now() - INTERVAL '24 hours'");
          break;
        case PostsGroup.HOT:
          qb.innerJoin(
            'PostsEntity.commentaries',
            'commentaries',
            "commentaries.createdAt >= Now() - INTERVAL '24 hours'",
          ).groupBy('PostsEntity.id');
          break;
      }
    }
    if (searchOptions.searchValue) {
      qb.andWhere('title ILIKE :searchValue', {
        searchValue: `%${searchOptions.searchValue}%`,
      });
    }
    switch (sortArgs.sort) {
      case SortVariant.CREATEDAT:
        qb.orderBy('PostsEntity.createdAt', sortArgs.order);
        break;
      case SortVariant.LIKES:
        filterPostArgs.group === PostsGroup.BEST
          ? qb.orderBy('group_count', sortArgs.order)
          : qb
              .addSelect('COUNT(likes_reactions.reaction) as likesCount')
              .leftJoin(
                'PostsEntity.reactions',
                'likes_reactions',
                'likes_reactions.reaction = :react',
                { react: Reaction.LIKE },
              )
              .groupBy('PostsEntity.id')
              .orderBy('likesCount', sortArgs.order);

        break;
    }

    return qb;
  }

  private getPaginate(
    qb: SelectQueryBuilder<PostsEntity>,
    paginateArgs: PaginateArgs,
  ) {
    return paginate<PostModel>(qb, paginateArgs);
  }
}
