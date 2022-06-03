import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { SortArgs } from 'src/common/args/sort.args';
import { Reaction } from 'src/common/enums/reaction.enum';
import { SortVariant } from 'src/common/enums/sort-variant.enum';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentariesRepository } from '../commentaries.repository';
import { CommentariesEntity } from '../entities/commentaries.entity';
import { CreateCommentaryInput } from '../inputs/create-commentary.input';
import { UpdateCommentaryInput } from '../inputs/update-commentary.input';
import { CommentaryModel } from '../models/commentary.model';

@Injectable()
export class CommentariesService {
  constructor(
    private commentaryRepository: CommentariesRepository,
    private postRepository: PostsRepository,
  ) {}

  async createCommentary(
    userId: number,
    dto: CreateCommentaryInput,
  ): Promise<CommentariesEntity> {
    const post: PostsEntity = await this.postRepository.findOne(dto.postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.commentaryRepository.save({
      userId: userId,
      ...dto,
    });
  }

  async updateCommentary(dto: UpdateCommentaryInput) {
    const commentary: CommentariesEntity =
      await this.commentaryRepository.findOne(dto.id);
    if (!commentary) {
      throw new NotFoundException('Commentary not found');
    }
    return this.commentaryRepository.save({
      ...commentary,
      ...dto,
    });
  }

  async deleteCommentary(id: number) {
    const commentaty: CommentariesEntity =
      await this.commentaryRepository.findOne(id);
    if (!commentaty) {
      throw new NotFoundException();
    }
    await this.commentaryRepository.delete(id);
    return commentaty;
  }

  async getPostCommentaries(
    postId: number,
    sortArgs: SortArgs,
    paginateArgs: PaginateArgs,
  ) {
    const post: PostsEntity = await this.postRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException('Пост с таким id отсутствует');
    }
    return this.commentaryRepository.getPostCommentaries(
      postId,
      sortArgs,
      paginateArgs,
    );
  }

  getUserCommentaries(userId: number, paginateArgs: PaginateArgs) {
    return this.commentaryRepository.getUserCommentaries(userId, paginateArgs);
  }
}
