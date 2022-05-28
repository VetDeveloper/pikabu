import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentaryRepository } from 'src/commentary/commentary.repository';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { CommentaryReactionRepository } from '../comment-reaction.repository';
import { CommentaryReactionEntity } from '../entities/comment-reaction.entity';
import { CreateCommentaryReactionInput } from '../inputs/create-commentary-reaction.model';
import { UpdateCommentaryReactionInput } from '../inputs/update-commentary-reaction.input';

@Injectable()
export class CommentaryReactionService {
  constructor(
    private commentaryReactionRepository: CommentaryReactionRepository,
    private commentaryRepository: CommentaryRepository,
  ) {}

  async createCommentaryReaction(
    userId: number,
    input: CreateCommentaryReactionInput,
  ) {
    const commentary: CommentaryEntity =
      await this.commentaryRepository.findOne(input.commentaryId);

    if (!commentary) {
      throw new NotFoundException('Комментарий с таким id не найден');
    }

    const alreadyExist: CommentaryReactionEntity =
      await this.commentaryReactionRepository.findCommentaryReactionByCommentaryUserIds(
        userId,
        input.commentaryId,
      );

    if (alreadyExist) {
      throw new BadRequestException(
        'Рекция от данного пользователя к этому комментарию уже существует',
      );
    }

    return this.commentaryReactionRepository.save({ ...input, userId });
  }

  async updateCommentaryReaction(input: UpdateCommentaryReactionInput) {
    const commentaryReaction: CommentaryReactionEntity =
      await this.commentaryReactionRepository.findOne(
        input.commentaryReactionId,
      );

    if (!commentaryReaction) {
      throw new NotFoundException('Рекция не найдена');
    }

    const newReaction = input.reaction
      ? input.reaction
      : commentaryReaction.reaction;

    return this.commentaryReactionRepository.save({
        ...commentaryReaction,
        reaction: newReaction
    })
  }

  async deleteCommentaryReaction(id: number) {
    const commentaryReaction: CommentaryReactionEntity =
      await this.commentaryReactionRepository.findOne(id);

    if (!commentaryReaction) {
      throw new NotFoundException('Рекция не найдена');
    }

    await this.commentaryReactionRepository.remove(commentaryReaction);
    return commentaryReaction;
  }
}
