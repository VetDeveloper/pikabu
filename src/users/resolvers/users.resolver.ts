import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentaryReactionsRepository } from 'src/comment-reactions/commentary-reactions.repository';
import { PaginatedCommentaryReaction } from 'src/comment-reactions/models/paginated-commentary-reaction.model';
import { CommentaryReactionsService } from 'src/comment-reactions/services/commentary-reactions.service';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { PaginatedCommentary } from 'src/commentaries/models/paginated-commentaty.model';
import { CommentariesService } from 'src/commentaries/services/commentaries.service';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedFavorite } from 'src/favorites/models/paginated-favorite.model';
import { FavoriteService } from 'src/favorites/services/favorite.service';
import { PaginatedPostReaction } from 'src/post-reactions/models/paginated-post-reaction.model';
import { PostReactionsRepository } from 'src/post-reactions/post-reaction.repository';
import { PostReactionsService } from 'src/post-reactions/services/post-reactions.service';
import { PaginatedPost } from 'src/posts/models/paginated-post.model';
import { PostsService } from 'src/posts/services/posts.service';
import { UserModel } from '../models/user.model';

@Resolver(UserModel)
export class UsersResolver {
  constructor(
    private postService: PostsService,
    private favouriteService: FavoriteService,
    private postReactionService: PostReactionsService,
    private commentaryReactionService: CommentaryReactionsService,
    private commentaryService: CommentariesService,
  ) {}

  @ResolveField('posts', () => PaginatedPost)
  posts(@Parent() author: UserModel, @Args() paginateArgs: PaginateArgs) {
    return this.postService.getUserPosts(author.id, paginateArgs);
  }

  @ResolveField('postReactions', () => PaginatedPostReaction)
  postReactions(
    @Parent() author: UserModel,
    @Args() paginateArgs: PaginateArgs,
  ) {
    return this.postReactionService.getUserPostReactions(
      author.id,
      paginateArgs,
    );
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
    return this.commentaryReactionService.getUserCommentaryReactions(
      author.id,
      paginateArgs,
    );
  }

  @ResolveField('favourites', () => PaginatedFavorite)
  favourites(@Parent() author: UserModel, @Args() paginateArgs: PaginateArgs) {
    return this.favouriteService.getUserFavourites(author.id, paginateArgs);
  }
}
