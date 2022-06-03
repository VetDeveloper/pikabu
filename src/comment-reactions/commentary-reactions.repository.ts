import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository } from 'typeorm';
import { CommentaryReactionsEntity } from './entities/commentary-reactions.entity';
import { CommentaryReactionModel } from './models/commentary-reaction.model';

@EntityRepository(CommentaryReactionsEntity)
export class CommentaryReactionsRepository extends Repository<CommentaryReactionsEntity> {
  findCommentaryReactionByCommentaryUserIds(
    userId: number,
    commentId: number,
  ): Promise<CommentaryReactionsEntity> {
    return this.findOne({
      where: {
        userId: userId,
        id: commentId,
      },
    });
  }

  getUserCommentaryReactions(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('com');
    qb.andWhere('com.userId = :userId', {
      userId: userId,
    });
    return paginate<CommentaryReactionModel>(qb, paginateArgs);
  }

  getCommentaryReactions(commId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('com');
    qb.andWhere('com.commentaryId = :commentaryId', {
      commentaryId: commId,
    });
    return paginate<CommentaryReactionModel>(qb, paginateArgs);
  }
}
