import { Loader } from '@app/dataloader';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UserModel } from 'src/users/models/user.model';
import { CommentaryModel } from '../models/commentary.model';
import * as DataLoader from 'dataloader';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PostLoader } from 'src/post/dataloader/post.loader';
import { PostEntity } from 'src/post/entities/post.entity';
import { PostModel } from 'src/post/models/post.model';
import { PaginatedCommentaryReaction } from 'src/comment-reaction/models/paginated-commentary-reaction.model';
import { CommentaryReactionRepository } from 'src/comment-reaction/comment-reaction.repository';
import { CommentaryReactionService } from 'src/comment-reaction/services/commentary-reaction.service';
import { PaginateArgs } from 'src/common/args/paginate.args';

@Resolver(() => CommentaryModel)
export class CommentaryResolver {
  constructor(private commentaryReactionService: CommentaryReactionService) {}

  @ResolveField('user', () => UserModel)
  user(
    @Parent() comment: CommentaryModel,
    @Loader(UsersLoader) userLoader: DataLoader<number, UsersEntity>,
  ) {
    return userLoader.load(comment.userId);
  }

  @ResolveField('post', () => PostModel)
  post(
    @Parent() comment: CommentaryModel,
    @Loader(PostLoader) postLoader: DataLoader<number, PostEntity>,
  ) {
    return postLoader.load(comment.postId);
  }

  @ResolveField('reactions', () => PaginatedCommentaryReaction)
  reactions(@Parent() comment: CommentaryModel, @Args() args: PaginateArgs) {
    return this.commentaryReactionService.getCommentaryReactions(
      comment.id,
      args,
    );
  }
}
