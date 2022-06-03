import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PostReactionModel } from 'src/post-reactions/models/post-reaction.model';
import { PostReactionsService } from 'src/post-reactions/services/post-reactions.service';
import { CreatePostReactionInput } from 'src/post-reactions/inputs/create-post-reaction.input';
import { PostReactionOwnerGuard } from 'src/post-reactions/guards/post-reaction-owner.guard';
import { UpdatePostReactionInput } from 'src/post-reactions/inputs/update-post-reaction.args';
import { DeletePostReactionArgs } from 'src/post-reactions/args/delete-post-reaction.args';

@Resolver(() => PostReactionModel)
export class PostReactionsMutationResolver {
  constructor(private postReactionService: PostReactionsService) {}

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
    @Args('updatePostReactionInput')
    updatePostReactionInput: UpdatePostReactionInput,
  ) {
    return this.postReactionService.updatePostReaction(updatePostReactionInput);
  }

  @Mutation(() => PostReactionModel)
  @UseGuards(GqlAuthGuard, PostReactionOwnerGuard)
  deletePostReaction(@Args() deletePostReactionArgs: DeletePostReactionArgs) {
    return this.postReactionService.deletePostReaction(
      deletePostReactionArgs.id,
    );
  }
}
