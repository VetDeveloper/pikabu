import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository } from 'typeorm';
import { PostReactionEntity } from './entities/post-reaction.entity';
import { PostReactionModel } from './models/post-reaction.model';

@EntityRepository(PostReactionEntity)
export class PostReactionRepository extends Repository<PostReactionEntity> {
  findPostReactionByPostUserIds(
    userId: number,
    postId: number,
  ): Promise<PostReactionEntity> {
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
