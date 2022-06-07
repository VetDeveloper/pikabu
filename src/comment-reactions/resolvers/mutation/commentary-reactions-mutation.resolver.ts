import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { DeleteCommentaryReactionArgs } from 'src/comment-reactions/args/delete-commentary-reaction.args';
import { CommentaryReactionOwnerGuard } from 'src/comment-reactions/guards/commentary-reaction-owner.guard';
import { CreateCommentaryReactionInput } from 'src/comment-reactions/inputs/create-commentary-reaction.model';
import { UpdateCommentaryReactionInput } from 'src/comment-reactions/inputs/update-commentary-reaction.input';
import { CommentaryReactionModel } from 'src/comment-reactions/models/commentary-reaction.model';
import { CommentaryReactionsService } from 'src/comment-reactions/services/commentary-reactions.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Resolver(() => CommentaryReactionModel)
export class CommentariReactionsMutationResolver {
  constructor(private commentaryReactionService: CommentaryReactionsService) {}

  @Mutation(() => CommentaryReactionModel)
  @UseGuards(GqlAuthGuard)
  createCommentaryReaction(
    @Args('createCommentaryReactionInput') input: CreateCommentaryReactionInput,
    @GetUser('id') userId: number,
  ) {
    return this.commentaryReactionService.createCommentaryReaction(
      userId,
      input,
    );
  }

  @Mutation(() => CommentaryReactionModel)
  @UseGuards(GqlAuthGuard, CommentaryReactionOwnerGuard)
  updateCommentaryReaction(
    @Args('updateCommentaryReactionInput') input: UpdateCommentaryReactionInput,
  ) {
    return this.commentaryReactionService.updateCommentaryReaction(input);
  }

  @Mutation(() => CommentaryReactionModel)
  @UseGuards(GqlAuthGuard, CommentaryReactionOwnerGuard)
  deleteCommentaryReaction(@Args() args: DeleteCommentaryReactionArgs) {
    return this.commentaryReactionService.deleteCommentaryReaction(args.id);
  }
}
