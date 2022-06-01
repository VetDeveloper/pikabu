import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { DeletePostReactionArgs } from '../args/delete-post-reaction.args';
import { UpdatePostReactionInput } from '../inputs/update-post-reaction.args';
import { PostReactionOwnerGuard } from '../guards/post-reaction-owner.guard';
import { CreatePostReactionInput } from '../inputs/create-post-reaction.input';
import { PostReactionModel } from '../models/post-reaction.model';
import { PostReactionService } from '../services/post-reaction.service';
import { UserModel } from 'src/user/models/user.model';
import { Loader } from '@app/dataloader';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserEntity } from 'src/user/entities/user.entity';
import * as DataLoader from 'dataloader';
import { PostModel } from 'src/post/models/post.model';
import { PostLoader } from 'src/post/dataloader/post.loader';
import { PostEntity } from 'src/post/entities/post.entity';

@Resolver(() => PostReactionModel)
export class PostReactionResolver {
  constructor(private postReactionService: PostReactionService) {}

  @Mutation(() => PostReactionModel)
  @UseGuards(GqlAuthGuard)
  createPostReaction(
    @GetUser('id') id: number,
    @Args('createPostReactionInput')
    createPostReactionInput: CreatePostReactionInput,
  ) {
    return this.postReactionService.createPostReaction(
      id,
      createPostReactionInput,
    );
  }

  @Mutation(() => PostReactionModel)
  @UseGuards(GqlAuthGuard, PostReactionOwnerGuard)
  updatePostReaction(
    @Args('updatePostReactionInput') updatePostReactionInput: UpdatePostReactionInput,
  ) {
    return this.postReactionService.updatePostReaction(
      updatePostReactionInput
    );
  }

  @Mutation(() => PostReactionModel)
  @UseGuards(GqlAuthGuard, PostReactionOwnerGuard)
  deletePostReaction(
    @Args() deletePostReactionArgs: DeletePostReactionArgs,
  ) {
    return this.postReactionService.deletePostReaction(
      deletePostReactionArgs.id,
    );
  }

  @ResolveField(() => UserModel)
  user(
    @Parent() postReaction: PostReactionModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
  ) {
    return userLoader.load(postReaction.userId);
  }

  @ResolveField(() => PostModel)
  post(
    @Parent() postReaction: PostReactionModel,
    @Loader(PostLoader) postLoader: DataLoader<number, PostEntity>,
  ) {
    return postLoader.load(postReaction.postId);
  }
}
