import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { SortArgs } from 'src/common/args/sort.args';
import { Reaction } from 'src/common/enums/reaction.enum';
import { Sort } from 'src/common/enums/sort.enum';
import { PostEntity } from 'src/post/entities/post.entity';
import { PostRepository } from 'src/post/post.repository';
import { CommentaryRepository } from '../commentary.repository';
import { CommentaryEntity } from '../entities/commentary.entity';
import { CreateCommentaryInput } from '../inputs/create-commentary.input';
import { UpdateCommentaryInput } from '../inputs/update-commentary.input';
import { CommentaryModel } from '../models/commentary.model';

@Injectable()
export class CommentaryService {
  constructor(
    private commentaryRepository: CommentaryRepository,
    private postRepository: PostRepository,
  ) {}

  async createCommentary(
    userId: number,
    dto: CreateCommentaryInput,
  ): Promise<CommentaryEntity> {
    const post: PostEntity = await this.postRepository.findOne(dto.postId);
    if (!post) {
      throw new NotFoundException('Пост с таким id отсутствует');
    }
    return this.commentaryRepository.save({
      userId: userId,
      ...dto,
    });
  }

  async updateCommentary(dto: UpdateCommentaryInput) {
    const commentary: CommentaryEntity =
      await this.commentaryRepository.findOne(dto.id);
    if (!commentary) {
      throw new NotFoundException('Комментария с таким id не найдено');
    }
    return this.commentaryRepository.save({
      ...commentary,
      ...dto,
    });
  }

  async deleteCommentary(id: number) {
    const commentaty: CommentaryEntity =
      await this.commentaryRepository.findOne(id);
    await this.commentaryRepository.delete(id);
    return commentaty;
  }

  async getPostCommentaries(
    postId: number,
    sortArgs: SortArgs,
    paginateArgs: PaginateArgs,
  ) {
    const post: PostEntity = await this.postRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException('Пост с таким id отсутствует');
    }
    return this.commentaryRepository.getPostCommentaries(postId, sortArgs, paginateArgs);
  }
}
