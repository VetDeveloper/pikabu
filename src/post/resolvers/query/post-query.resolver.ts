import {
  Args,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { PaginateArgs } from 'src/post/args/paginate.args';
import { SearchArgs } from 'src/post/args/search-post.args';
import { PaginatedPost } from 'src/post/models/paginated-post.model';
import { PostModel } from 'src/post/models/post.model';
import { PostService } from 'src/post/services/post.service';


@Resolver(() => PostModel)
export class PostQueryResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => PaginatedPost)
  getPosts(@Args() paginateArgs: PaginateArgs, @Args() searchArgs: SearchArgs) {
    return this.postService.getPosts(paginateArgs, searchArgs);
  }
}
