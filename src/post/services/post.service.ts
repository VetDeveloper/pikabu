import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from '../inputs/create-post.input';
import { UpdatePostInput } from '../inputs/update-post.input';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../post.repository';
import {
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PaginateArgs } from '../args/paginate.args';
import { SearchArgs } from '../args/search-post.args';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  getPostsByIds(ids: number[]) {
    return this.postRepository.findByIds(ids);
  }

  createOnePost(userId: number, dto: CreatePostInput): Promise<PostModel> {
    return this.postRepository.save({ userId: userId, ...dto });
  }

  getPosts(paginateOptions: PaginateArgs, searchOptions: SearchArgs) {
    return this.postRepository.getPosts(paginateOptions, searchOptions);
  }

  getUserPosts(userId: number, paginateArgs: PaginateArgs) {
    return this.postRepository.getUserPosts(userId, paginateArgs);
  }

  async updatePost(
    dto: UpdatePostInput,
  ): Promise<PostModel> {
    const post: PostModel = await this.postRepository.findOne(dto.postId);
    if (!post) {
      throw new NotFoundException();
    }
    return this.postRepository.save({ ...post, ...dto });
  }

  async deletePost(postId: number): Promise<PostModel> {
    const post: PostModel = await this.postRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException();
    }
    await this.postRepository.delete(postId);
    return post;
  }

  findOne(id: number) {
    return this.postRepository.findOneOrFail(id);
  }
}
