import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostReactionsEntity } from '../entities/post-reactions.entity';
import { CreatePostReactionInput } from '../inputs/create-post-reaction.input';
import { PostReactionsRepository } from '../post-reaction.repository';
import { Reaction } from '../../common/enums/reaction.enum';
import { UpdatePostReactionInput } from '../inputs/update-post-reaction.args';
import { PaginateArgs } from 'src/common/args/paginate.args';

@Injectable()
export class PostReactionsService {
  constructor(
    private postReactionRepository: PostReactionsRepository,
    private postRepository: PostsRepository,
  ) {}

  async createPostReaction(
    userId: number,
    dto: CreatePostReactionInput,
  ): Promise<PostReactionsEntity> {
    const post: PostsEntity = await this.postRepository.findOne(dto.postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const alreadyExist: PostReactionsEntity =
      await this.postReactionRepository.findPostReactionByPostUserIds(
        userId,
        dto.postId,
      );

    if (alreadyExist) {
      throw new BadRequestException(
        'A comment from this user to this post already exists',
      );
    }

    return this.postReactionRepository.save({ ...dto, userId });
  }

  async updatePostReaction(
    dto: UpdatePostReactionInput,
  ): Promise<PostReactionsEntity> {
    const postReaction: PostReactionsEntity =
      await this.postReactionRepository.findOne(dto.id);

    if (!postReaction) {
      throw new NotFoundException('Reaction not found');
    }

    const newReaction = dto.reaction ? dto.reaction : postReaction.reaction;

    return this.postReactionRepository.save({
      ...postReaction,
      reaction: newReaction,
    });
  }

  async deletePostReaction(id: number): Promise<PostReactionsEntity> {
    const postReaction: PostReactionsEntity =
      await this.postReactionRepository.findOne(id);

    if (!postReaction) {
      throw new NotFoundException('Reaction not found');
    }

    await this.postReactionRepository.remove(postReaction);
    return postReaction;
  }

  getUserPostReactions(userId: number, paginateArgs: PaginateArgs) {
    return this.postReactionRepository.getUserPostReactions(
      userId,
      paginateArgs,
    );
  }

  getPostReactions(postId: number, paginateArgs: PaginateArgs) {
    return this.postReactionRepository.getPostReaction(postId, paginateArgs);
  }

  findOne(id: number) {
    return this.postReactionRepository.findOneOrFail(id)
  }
}
