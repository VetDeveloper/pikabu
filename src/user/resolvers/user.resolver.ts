import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentaryReactionRepository } from 'src/comment-reaction/comment-reaction.repository';
import { PaginatedCommentaryReaction } from 'src/comment-reaction/models/paginated-commentary-reaction.model';
import { CommentaryReactionService } from 'src/comment-reaction/services/commentary-reaction.service';
import { CommentaryRepository } from 'src/commentary/commentary.repository';
import { PaginatedCommentary } from 'src/commentary/models/paginated-commentaty.model';
import { CommentaryService } from 'src/commentary/services/commentary.service';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedFavourite } from 'src/favourites/models/paginated-favourite.model';
import { FavouriteService } from 'src/favourites/services/favourite.service';
import { PaginatedPostReaction } from 'src/post-reaction/models/paginated-post-reaction.model';
import { PostReactionRepository } from 'src/post-reaction/post-reaction.repository';
import { PostReactionService } from 'src/post-reaction/services/post-reaction.service';
import { PaginatedPost } from 'src/post/models/paginated-post.model';
import { PostService } from 'src/post/services/post.service';
import { UserModel } from '../models/user.model';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private postService: PostService,
    private favouriteService: FavouriteService,
    private postReactionService: PostReactionService,
    private commentaryReactionService: CommentaryReactionService,
    private commentaryService: CommentaryService
  ) {}

  @ResolveField('posts', () => PaginatedPost)
  posts(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.postService.getUserPosts(author.id, paginateArgs);
  }

  @ResolveField('postReactions', () => PaginatedPostReaction)
  postReactions(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.postReactionService.getUserPostReactions(author.id, paginateArgs);
  }

  @ResolveField('commentaries', () => PaginatedCommentary)
  commentaries(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.commentaryService.getUserCommentaries(author.id, paginateArgs);
  }

  @ResolveField('commentaryReactions', () => PaginatedCommentaryReaction)
  commentaryReactions(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.commentaryReactionService.getUserCommentaryReactions(author.id, paginateArgs);
  }

  @ResolveField('favourites', ()=> PaginatedFavourite)
  favourites(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.favouriteService.getUserFavourites(author.id, paginateArgs);
  }
}
