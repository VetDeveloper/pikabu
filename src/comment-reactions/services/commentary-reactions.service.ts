import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { CommentariesEntity } from 'src/commentaries/entities/commentaries.entity';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { CommentaryReactionsRepository } from '../commentary-reactions.repository';
import { CommentaryReactionsEntity } from '../entities/commentary-reactions.entity';
import { CreateCommentaryReactionInput } from '../inputs/create-commentary-reaction.model';
import { UpdateCommentaryReactionInput } from '../inputs/update-commentary-reaction.input';

@Injectable()
export class CommentaryReactionsService {
  constructor(
    private commentaryReactionRepository: CommentaryReactionsRepository,
    private commentaryRepository: CommentariesRepository,
  ) {}

  async createCommentaryReaction(
    userId: number,
    input: CreateCommentaryReactionInput,
  ) {
    const commentary: CommentariesEntity =
      await this.commentaryRepository.findOne(input.commentaryId);

    if (!commentary) {
      throw new NotFoundException('Commentary with this id was not found');
    }

    const alreadyExist: CommentaryReactionsEntity =
      await this.commentaryReactionRepository.findCommentaryReactionByCommentaryUserIds(
        userId,
        input.commentaryId,
      );

    if (alreadyExist) {
      throw new BadRequestException(
        'A comment from this user already exists for this comment',
      );
    }

    return this.commentaryReactionRepository.save({ ...input, userId });
  }

  async updateCommentaryReaction(input: UpdateCommentaryReactionInput) {
    const commentaryReaction: CommentaryReactionsEntity =
      await this.commentaryReactionRepository.findOne(
        input.commentaryReactionId,
      );

    if (!commentaryReaction) {
      throw new NotFoundException('Reaction not found');
    }

    const newReaction = input.reaction
      ? input.reaction
      : commentaryReaction.reaction;

    return this.commentaryReactionRepository.save({
      ...commentaryReaction,
      reaction: newReaction,
    });
  }

  async deleteCommentaryReaction(id: number) {
    const commentaryReaction: CommentaryReactionsEntity =
      await this.commentaryReactionRepository.findOne(id);

    if (!commentaryReaction) {
      throw new NotFoundException('Reaction not found');
    }

    await this.commentaryReactionRepository.remove(commentaryReaction);
    return commentaryReaction;
  }

  getUserCommentaryReactions(userId: number, paginateArgs: PaginateArgs) {
    return this.commentaryReactionRepository.getUserCommentaryReactions(
      userId,
      paginateArgs,
    );
  }

  getCommentaryReactions(commentId: number, paginateArgs: PaginateArgs) {
    return this.commentaryReactionRepository.getCommentaryReactions(
      commentId,
      paginateArgs,
    );
  }

  findOne(id: number) {
    return this.commentaryReactionRepository.findOneOrFail(id);
  }
}
