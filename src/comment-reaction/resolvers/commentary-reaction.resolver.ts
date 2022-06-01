import { Loader } from '@app/dataloader';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateCommentaryReactionInput } from 'src/comment-reaction/inputs/create-commentary-reaction.model';
import { CommentaryReactionModel } from 'src/comment-reaction/models/commentary-reaction.model';
import { CommentaryReactionService } from 'src/comment-reaction/services/commentary-reaction.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModel } from 'src/user/models/user.model';
import { DeleteCommentaryReactionArgs } from '../args/delete-commentary-reaction.args';
import { CommentaryReactionOwnerGuard } from '../guards/commentary-reaction-owner.guard';
import { UpdateCommentaryReactionInput } from '../inputs/update-commentary-reaction.input';
import * as DataLoader from 'dataloader';
import { CommentaryModel } from 'src/commentary/models/commentary.model';
import { CommentaryLoader } from 'src/commentary/dataloader/commentary.loader';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';

@Resolver(() => CommentaryReactionModel)
export class CommentariReactionResolver {
  constructor(private commentaryReactionService: CommentaryReactionService) {}

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

  @ResolveField(() => UserModel)
  user(
    @Parent() commentReaction: CommentaryReactionModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
  ) {
    return userLoader.load(commentReaction.userId);
  }

  @ResolveField(() => CommentaryModel)
  commentary(
    @Parent() commentReaction: CommentaryReactionModel,
    @Loader(CommentaryLoader) commentaryLoader: DataLoader<number, CommentaryEntity>,
  ) {
      return commentaryLoader.load(commentReaction.commentaryId);
  }
}
