import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { PostModel } from '../models/post.model';
import { Loader } from '@app/dataloader';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UsersEntity } from 'src/users/entities/users.entity';
import * as DataLoader from 'dataloader';
import { PaginatedCommentary } from 'src/commentaries/models/paginated-commentaty.model';
import { CommentariesService } from 'src/commentaries/services/commentaries.service';
import { SortArgs } from 'src/common/args/sort.args';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedPostReaction } from 'src/post-reactions/models/paginated-post-reaction.model';
import { PostReactionsService } from 'src/post-reactions/services/post-reactions.service';

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(
    private comServ: CommentariesService,
    private postReactionService: PostReactionsService,
  ) {}

  @ResolveField(() => UserModel)
  user(
    @Parent() post: PostModel,
    @Loader(UsersLoader) userLoader: DataLoader<number, UsersEntity>,
  ) {
    return userLoader.load(post.userId);
  }

  @ResolveField(() => PaginatedCommentary)
  commentaries(
    @Parent() post: PostModel,
    @Args() sortArgs: SortArgs,
    @Args() paginateArtgs: PaginateArgs,
  ) {
    return this.comServ.getPostCommentaries(post.id, sortArgs, paginateArtgs);
  }

  @ResolveField(() => PaginatedPostReaction)
  postReaction(@Parent() post: PostModel, @Args() paginateArtgs: PaginateArgs) {
    return this.postReactionService.getPostReactions(post.id, paginateArtgs);
  }
}
