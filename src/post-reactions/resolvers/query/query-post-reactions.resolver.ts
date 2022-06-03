import { Args, Query, Resolver } from "@nestjs/graphql";
import { GetOneEntityArgs } from "src/common/args/get-one-entity.args";
import { PostReactionModel } from "src/post-reactions/models/post-reaction.model";
import { PostReactionsService } from "src/post-reactions/services/post-reactions.service";

@Resolver(() => PostReactionModel)
export class QueryPostReactionsResolver {
    constructor(private postReactionService: PostReactionsService) {}

    @Query(() => PostReactionModel)
    getPostReaction(
        @Args() args: GetOneEntityArgs
    ) {
        return this.postReactionService.findOne(args.id)
    }
}