import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { SortArgs } from 'src/common/args/sort.args';
import { Reaction } from 'src/common/enums/reaction.enum';
import { SortVariant } from 'src/common/enums/sort-variant.enum';
import { EntityRepository, Repository } from 'typeorm';
import { CommentariesEntity } from './entities/commentaries.entity';
import { CommentaryModel } from './models/commentary.model';

@EntityRepository(CommentariesEntity)
export class CommentariesRepository extends Repository<CommentariesEntity> {
  getPostCommentaries(
    postId: number,
    sortArgs: SortArgs,
    paginateArgs: PaginateArgs,
  ) {
    const qb = this.createQueryBuilder('comments');
    qb.where({
      postId: postId,
    });

    switch (sortArgs.sort) {
      case SortVariant.CREATEDAT:
        qb.orderBy('comments.createdAt', sortArgs.order);
        break;
      case SortVariant.LIKES:
        qb.addSelect('COUNT(reactions.reaction) as likesCount')
          .leftJoin(
            'comments.reactions',
            'reactions',
            'reactions.reaction = :react',
            { react: Reaction.LIKE },
          )
          .groupBy('comments.id')
          .orderBy('likesCount', sortArgs.order);
        break;
    }

    return paginate<CommentaryModel>(qb, paginateArgs);
  }

  getUserCommentaries(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('com');
    qb.andWhere('com.userId = :userId', {
      userId: userId,
    });
    return paginate<CommentaryModel>(qb, paginateArgs);
  }
}
