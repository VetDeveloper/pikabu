import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostInput } from '../inputs/create-post.input';
import { UpdatePostInput } from '../inputs/update-post.input';
import { PostModel } from '../models/post.model';
import { PostsRepository } from '../posts.repository';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from '../../common/args/paginate.args';
import { SearchArgs } from '../args/search-post.args';
import { SortArgs } from 'src/common/args/sort.args';
import { FilterArgs } from '../args/filter-post.args';
import { FavoritesRepository } from 'src/favorites/favorites.repository';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostsRepository,
    private favouriteRepository: FavoritesRepository,
  ) {}

  getPostsByIds(ids: number[]) {
    return this.postRepository.findByIds(ids);
  }

  createOnePost(userId: number, dto: CreatePostInput): Promise<PostModel> {
    const imagesCount = dto.images.length;
    const orders = []
    for(let i=0; i<imagesCount; i++) {
      if (!orders.find((order) => {
        return order === order;
      })) {
        orders.push(dto.images[i].order)
      }
      else {
        throw new BadRequestException('Order is already exist');
      }
    }
    return this.postRepository.save({ userId: userId, ...dto });
  }

  getPosts(
    paginateOptions: PaginateArgs,
    searchOptions: SearchArgs,
    sortArgs: SortArgs,
    filterPostArgs: FilterArgs,
  ) {
    return this.postRepository.getPosts(
      paginateOptions,
      searchOptions,
      sortArgs,
      filterPostArgs,
    );
  }

  getUserPosts(userId: number, paginateArgs: PaginateArgs) {
    return this.postRepository.getUserPosts(userId, paginateArgs);
  }

  async updatePost(dto: UpdatePostInput): Promise<PostModel> {
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
    await this.favouriteRepository.deletePostFavourites(postId);
    await this.postRepository.delete(postId);
    return post;
  }

  findOne(id: number) {
    return this.postRepository.findOneOrFail(id);
  }
}
