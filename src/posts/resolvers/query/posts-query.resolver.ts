import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetOneEntityArgs } from 'src/common/args/get-one-entity.args';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { SortArgs } from 'src/common/args/sort.args';
import { FilterArgs } from 'src/posts/args/filter-post.args';
import { SearchArgs } from 'src/posts/args/search-post.args';
import { PaginatedPost } from 'src/posts/models/paginated-post.model';
import { PostModel } from 'src/posts/models/post.model';
import { PostsService } from 'src/posts/services/posts.service';

@Resolver(() => PostModel)
export class PostsQueryResolver {
  constructor(private readonly postService: PostsService) {}

  @Query(() => PaginatedPost)
  getPosts(
    @Args() paginateArgs: PaginateArgs,
    @Args() searchArgs: SearchArgs,
    @Args() sortArgs: SortArgs,
    @Args() filterPostArgs: FilterArgs,
  ) {
    return this.postService.getPosts(
      paginateArgs,
      searchArgs,
      sortArgs,
      filterPostArgs,
    );
  }

  @Query(() => PostModel)
  getPost(
    @Args() args: GetOneEntityArgs
  ) {
    return this.postService.findOne(args.id)
  }
}
