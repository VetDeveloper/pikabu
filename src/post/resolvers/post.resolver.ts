import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/user.model';
import { PostModel } from '../models/post.model';
import { Loader } from '@app/dataloader';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UsersEntity } from 'src/users/entities/users.entity';
import * as DataLoader from 'dataloader';
import { PaginatedCommentary } from 'src/commentary/models/paginated-commentaty.model';
import { CommentaryService } from 'src/commentary/services/commentary.service';
import { SortArgs } from 'src/common/args/sort.args';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedPostReaction } from 'src/post-reactions/models/paginated-post-reaction.model';
import { PostReactionsService } from 'src/post-reactions/services/post-reactions.service';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(
    private comServ: CommentaryService,
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
    return this.postReactionService.getPostReaction(post.id, paginateArtgs);
  }
}
