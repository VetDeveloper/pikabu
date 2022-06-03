import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository } from 'typeorm';
import { PostReactionsEntity } from './entities/post-reactions.entity';
import { PostReactionModel } from './models/post-reaction.model';

@EntityRepository(PostReactionsEntity)
export class PostReactionsRepository extends Repository<PostReactionsEntity> {
  findPostReactionByPostUserIds(
    userId: number,
    postId: number,
  ): Promise<PostReactionsEntity> {
    return this.findOne({
      where: {
        userId: userId,
        postId: postId,
      },
    });
  }

  getUserPostReactions(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('react');
    qb.andWhere('react.userId = :userId', {
      userId: userId,
    });
    return paginate<PostReactionModel>(qb, paginateArgs);
  }

  getPostReaction(postId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('react');
    qb.andWhere('react.postId = :postId', {
      postId: postId,
    });
    return paginate<PostReactionModel>(qb, paginateArgs);
  }
}
