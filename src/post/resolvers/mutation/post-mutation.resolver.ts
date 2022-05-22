import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PostOwnerGuard } from 'src/post/guards/post-owner.guard';
import { CreatePostInput } from 'src/post/inputs/create-post.input';
import { UpdatePostInput } from 'src/post/inputs/update-post.input';
import { PostModel } from 'src/post/models/post.model';
import { PostService } from 'src/post/services/post.service';
import { UserModel } from 'src/user/models/user.model';

@Resolver(() => PostModel)
export class PostMutationResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  createNewPost(
    @Args('newPostArgs') newUserArgs: CreatePostInput,
    @GetUser() user: UserModel,
  ) {
    return this.postService.createOnePost(user.id, newUserArgs);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard, PostOwnerGuard)
  updatePost(
    @Args('postId') postId: number,
    @Args('updatePostArgs') args: UpdatePostInput,
  ) {
    return this.postService.updatePost(postId, args);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard, PostOwnerGuard)
  deletePost(@Args('postId') postId: number) {
    return this.postService.deletePost(postId);
  }
}
