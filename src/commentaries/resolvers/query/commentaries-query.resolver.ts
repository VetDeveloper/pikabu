import { Args, Query, Resolver } from "@nestjs/graphql";
import { CommentaryModel } from "src/commentaries/models/commentary.model";
import { CommentariesService } from "src/commentaries/services/commentaries.service";
import { GetOneEntityArgs } from "src/common/args/get-one-entity.args";

@Resolver(() => CommentaryModel)
export class CommentaryQueryResolver {
  constructor(private commentaryService: CommentariesService) {}

  @Query(() => CommentaryModel)
  getCommentary(
      @Args() args: GetOneEntityArgs
  ) {
      return this.commentaryService.findOne(args.id)
  }
}