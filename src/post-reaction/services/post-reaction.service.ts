import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostEntity } from 'src/post/entities/post.entity';
import { PostRepository } from 'src/post/post.repository';
import { PostReactionEntity } from '../entities/post-reaction.entity';
import { CreatePostReactionInput } from '../inputs/create-post-reaction.input';
import { PostReactionRepository } from '../post-reaction.repository';
import { Reaction } from '../../common/enums/reaction.enum';
import { UpdatePostReactionInput } from '../inputs/update-post-reaction.args';
import { PaginateArgs } from 'src/common/args/paginate.args';

@Injectable()
export class PostReactionService {
  constructor(
    private postReactionRepository: PostReactionRepository,
    private postRepository: PostRepository,
  ) {}

  async createPostReaction(
    userId: number,
    dto: CreatePostReactionInput,
  ): Promise<PostReactionEntity> {
    const post: PostEntity = await this.postRepository.findOne(dto.postId);
    if (!post) {
      throw new NotFoundException('Поста с таким id не найден');
    }

    const alreadyExist: PostReactionEntity =
      await this.postReactionRepository.findPostReactionByPostUserIds(
        userId,
        dto.postId,
      );

    if (alreadyExist) {
      throw new BadRequestException(
        'Рекция от данного пользователя к этому посту уже существует',
      );
    }

    return this.postReactionRepository.save({ ...dto, userId });
  }

  async updatePostReaction(
    dto: UpdatePostReactionInput,
  ): Promise<PostReactionEntity> {
    const postReaction: PostReactionEntity =
      await this.postReactionRepository.findOne(dto.id);

    if (!postReaction) {
      throw new NotFoundException('Рекция не найдена');
    }

    const newReaction = dto.reaction ? dto.reaction : postReaction.reaction;

    return this.postReactionRepository.save({
      ...postReaction,
      reaction: newReaction,
    });
  }

  async deletePostReaction(id: number): Promise<PostReactionEntity> {
    const postReaction: PostReactionEntity =
      await this.postReactionRepository.findOne(id);

    if (!postReaction) {
      throw new NotFoundException('Рекция не найдена');
    }

    await this.postReactionRepository.remove(postReaction);
    return postReaction;
  }

  getUserPostReactions(userId: number, paginateArgs: PaginateArgs) {
    return this.postReactionRepository.getUserPostReactions(userId, paginateArgs);
  }

  getPostReaction(postId: number, paginateArgs: PaginateArgs) {
    return this.postReactionRepository.getPostReaction(postId, paginateArgs);
  }
}
