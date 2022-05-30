import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';
import { PostModel } from '../models/post.model';
import { Loader } from '@app/dataloader';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserEntity } from 'src/user/entities/user.entity';
import * as DataLoader from 'dataloader';
import { PaginatedCommentary } from 'src/commentary/models/paginated-commentaty.model';
import { CommentaryService } from 'src/commentary/services/commentary.service';
import { SortArgs } from 'src/common/args/sort.args';
import { PaginateArgs } from 'src/common/args/paginate.args';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private comServ: CommentaryService) {}

  @ResolveField(() => UserModel)
  user(
    @Parent() post: PostModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
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
}
