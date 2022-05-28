import { EntityRepository, Repository } from 'typeorm';
import { CommentaryReactionEntity } from './entities/comment-reaction.entity';

@EntityRepository(CommentaryReactionEntity)
export class CommentaryReactionRepository extends Repository<CommentaryReactionEntity> {
    findCommentaryReactionByCommentaryUserIds(userId: number, commentId: number) : Promise<CommentaryReactionEntity> {
        return this.findOne({where: {
            userId: userId,
            id: commentId,
        }})
    }
}
