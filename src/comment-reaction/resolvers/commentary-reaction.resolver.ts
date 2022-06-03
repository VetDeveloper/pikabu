import { Loader } from '@app/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentaryReactionModel } from 'src/comment-reaction/models/commentary-reaction.model';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UserModel } from 'src/users/models/user.model';
import * as DataLoader from 'dataloader';
import { CommentaryModel } from 'src/commentary/models/commentary.model';
import { CommentaryLoader } from 'src/commentary/dataloader/commentary.loader';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';

@Resolver(() => CommentaryReactionModel)
export class CommentaryReactionResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() commentReaction: CommentaryReactionModel,
    @Loader(UsersLoader) userLoader: DataLoader<number, UsersEntity>,
  ) {
    return userLoader.load(commentReaction.userId);
  }

  @ResolveField(() => CommentaryModel)
  commentary(
    @Parent() commentReaction: CommentaryReactionModel,
    @Loader(CommentaryLoader)
    commentaryLoader: DataLoader<number, CommentaryEntity>,
  ) {
    return commentaryLoader.load(commentReaction.commentaryId);
  }
}
