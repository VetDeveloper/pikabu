import { UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserModel } from 'src/user/models/user.model';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostModel } from './models/post.model';
import { PostService } from './post.service';
import { PaginatedPost } from './models/paginated-post.model';
import { defaultPaginateInput, PaginateInput } from './inputs/paginate.input';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  createNewPost(
    @Args('newPostArgs') newUserArgs: CreatePostInput,
    @GetUser() user: UserModel,
  ) {
    return this.postService.createOnePost(user.id, newUserArgs);
  }

  @Query(() => PaginatedPost)
  getPosts(
    @Args('paginateArgs', {
      defaultValue: defaultPaginateInput,
    })
    args: PaginateInput,
  ) {
    return this.postService.getPosts({ ...args });
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  updatePost(
    @Args('postId') postId: number,
    @Args('updatePostArgs') args: UpdatePostInput,
    @GetUser('id') userId: number,
  ) {
    return this.postService.updatePost(userId, postId, args);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  deletePost(@Args('postId') postId: number, @GetUser('id') userId: number) {
    return this.postService.deletePost(userId, postId);
  }
}
