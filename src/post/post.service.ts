import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostModel } from './models/post.model';
import { PostRepository } from './post.repository';
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PaginateInput } from './inputs/paginate.input';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  createOnePost(userId: number, dto: CreatePostInput): Promise<PostModel> {
    return this.postRepository.save({ userId: userId, ...dto });
  }

  getPosts(options: PaginateInput) {
    const queryBuilder = this.postRepository.createQueryBuilder();
    queryBuilder.orderBy('PostEntity.createdAt', 'DESC'); //обратный порядок по дате создания
    return paginate<PostModel>(queryBuilder, options);
  }

  async updatePost(
    userId: number,
    postId: number,
    dto: UpdatePostInput,
  ): Promise<PostModel> {
    const post: PostModel = await this.postRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException();
    }
    if (post.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.postRepository.save({ ...post, ...dto });
  }

  async deletePost(userId: number, postId: number): Promise<PostModel> {
    const post: PostModel = await this.postRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException();
    }
    if (post.userId !== userId) {
      throw new ForbiddenException();
    }
    await this.postRepository.delete(postId);
    return post;
  }

  findOne(id: number) {
    return this.postRepository.findOneOrFail(id);
  }
}
