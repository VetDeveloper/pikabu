import { Loader } from '@app/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentaryReactionModel } from 'src/comment-reaction/models/commentary-reaction.model';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModel } from 'src/user/models/user.model';
import * as DataLoader from 'dataloader';
import { CommentaryModel } from 'src/commentary/models/commentary.model';
import { CommentaryLoader } from 'src/commentary/dataloader/commentary.loader';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';

@Resolver(() => CommentaryReactionModel)
export class CommentaryReactionResolver {
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
    @Loader(CommentaryLoader)
    commentaryLoader: DataLoader<number, CommentaryEntity>,
  ) {
    return commentaryLoader.load(commentReaction.commentaryId);
  }
}
