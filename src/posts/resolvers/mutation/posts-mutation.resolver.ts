import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PostOwnerGuard } from 'src/posts/guards/post-owner.guard';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { PostModel } from 'src/posts/models/post.model';
import { PostsService } from 'src/posts/services/posts.service';
import { UserModel } from 'src/users/models/user.model';

@Resolver(() => PostModel)
export class PostsMutationResolver {
  constructor(private readonly postService: PostsService) {}

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
  updatePost(@Args('updatePostInput') input: UpdatePostInput) {
    return this.postService.updatePost(input);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard, PostOwnerGuard)
  deletePost(@Args('postId') postId: number) {
    return this.postService.deletePost(postId);
  }
}
