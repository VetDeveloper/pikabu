import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository } from 'typeorm';
import { CommentaryReactionEntity } from './entities/comment-reaction.entity';
import { CommentaryReactionModel } from './models/commentary-reaction.model';

@EntityRepository(CommentaryReactionEntity)
export class CommentaryReactionRepository extends Repository<CommentaryReactionEntity> {
  findCommentaryReactionByCommentaryUserIds(
    userId: number,
    commentId: number,
  ): Promise<CommentaryReactionEntity> {
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
