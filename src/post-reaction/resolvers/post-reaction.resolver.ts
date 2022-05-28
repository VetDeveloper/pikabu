import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { DeletePostReactionArgs } from '../args/delete-post-reaction.args';
import { UpdatePostReactionInput } from '../inputs/update-post-reaction.args';
import { PostReactionOwnerGuard } from '../guards/post-reaction-owner.guard';
import { CreatePostReactionInput } from '../inputs/create-post-reaction.input';
import { PostReactionModel } from '../models/post-reaction.model';
import { PostReactionService } from '../services/post-reaction.service';

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
}
