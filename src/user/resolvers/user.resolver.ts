import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedFavourite } from 'src/favourites/models/paginated-favourite.model';
import { FavouriteService } from 'src/favourites/services/favourite.service';
import { PaginatedPost } from 'src/post/models/paginated-post.model';
import { PostService } from 'src/post/services/post.service';
import { UserModel } from '../models/user.model';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private postService: PostService,
    private favouriteService: FavouriteService
  ) {}

  @ResolveField('posts', () => PaginatedPost)
  posts(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.postService.getUserPosts(author.id, paginateArgs);
  }

  @ResolveField('favourites', ()=> PaginatedFavourite)
  favourites(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.favouriteService.getUserFavourites(author.id, paginateArgs);
  }
}
