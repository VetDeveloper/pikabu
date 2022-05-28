import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { DeleteCommentaryArgs } from "src/commentary/args/delete-commentary.args";
import { CommentaryOwnerGuard } from "src/commentary/guards/commentary-owner.guard";
import { CreateCommentaryInput } from "src/commentary/inputs/create-commentary.input";
import { UpdateCommentaryInput } from "src/commentary/inputs/update-commentary.input";
import { CommentaryModel } from "src/commentary/models/commentary.model";
import { CommentaryService } from "src/commentary/services/commentary.service";
import { GetUser } from "src/common/decorators/get-user.decorator";

@Resolver(() => CommentaryModel)
export class CommentaryMutationResolver {
    constructor(private commentaryService: CommentaryService) {}

    @Mutation(() => CommentaryModel)
    @UseGuards(GqlAuthGuard)
    createCommentary(
        @Args('CreateCommentaryInput') createCommentaryInput: CreateCommentaryInput,
        @GetUser('id') userId: number
    ) {
        return this.commentaryService.createCommentary(userId, createCommentaryInput);
    }

    @Mutation(() => CommentaryModel)
    @UseGuards(GqlAuthGuard, CommentaryOwnerGuard)
    updateCommentary(
        @Args('updateCommentaryInput') input: UpdateCommentaryInput
    ) {
        return this.commentaryService.updateCommentary(input);
    }

    @Mutation(() => CommentaryModel)
    @UseGuards(GqlAuthGuard, CommentaryOwnerGuard)
    deleteCommentary(
        @Args() deleteCommentaryArgs: DeleteCommentaryArgs
    ) {
        return this.commentaryService.deleteCommentary(deleteCommentaryArgs.id)
    }
}