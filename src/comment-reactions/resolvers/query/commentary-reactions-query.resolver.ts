import { Args, Query, Resolver } from "@nestjs/graphql";
import { CommentaryReactionModel } from "src/comment-reactions/models/commentary-reaction.model";
import { CommentaryReactionsService } from "src/comment-reactions/services/commentary-reactions.service";
import { GetOneEntityArgs } from "src/common/args/get-one-entity.args";

@Resolver(() => CommentaryReactionModel)
export class CommentariReactionsQueryResolver {
  constructor(private commentaryReactionService: CommentaryReactionsService) {}

  @Query(() => CommentaryReactionModel)
  getCommentaryReaction(
      @Args() args: GetOneEntityArgs
  ) {
      return this.commentaryReactionService.findOne(args.id)
  }
}