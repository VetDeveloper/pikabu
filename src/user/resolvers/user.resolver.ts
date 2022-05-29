import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedPost } from 'src/post/models/paginated-post.model';
import { PostService } from 'src/post/services/post.service';
import { UserModel } from '../models/user.model';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private postService: PostService,
  ) {}

  @ResolveField('posts', () => PaginatedPost)
  async posts(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.postService.getUserPosts(author.id, paginateArgs);
  }
}
