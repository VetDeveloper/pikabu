import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { SortArgs } from 'src/common/args/sort.args';
import { Reaction } from 'src/common/enums/reaction.enum';
import { Sort } from 'src/common/enums/sort.enum';
import { EntityRepository, Repository } from 'typeorm';
import { CommentaryEntity } from './entities/commentary.entity';
import { CommentaryModel } from './models/commentary.model';

@EntityRepository(CommentaryEntity)
export class CommentaryRepository extends Repository<CommentaryEntity> {
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
      case Sort.CREATEDAT:
        qb.orderBy('comments.createdAt', sortArgs.order);
        break;
      case Sort.LIKES:
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
