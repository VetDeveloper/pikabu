import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PostReactionModel } from 'src/post-reaction/models/post-reaction.model';
import { PostReactionService } from 'src/post-reaction/services/post-reaction.service';
import { CreatePostReactionInput } from 'src/post-reaction/inputs/create-post-reaction.input';
import { PostReactionOwnerGuard } from 'src/post-reaction/guards/post-reaction-owner.guard';
import { UpdatePostReactionInput } from 'src/post-reaction/inputs/update-post-reaction.args';
import { DeletePostReactionArgs } from 'src/post-reaction/args/delete-post-reaction.args';

@Resolver(() => PostReactionModel)
export class PostReactionMutationResolver {
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