import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentaryReactionRepository } from 'src/comment-reaction/comment-reaction.repository';
import { PaginatedCommentaryReaction } from 'src/comment-reaction/models/paginated-commentary-reaction.model';
import { CommentaryReactionService } from 'src/comment-reaction/services/commentary-reaction.service';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { PaginatedCommentary } from 'src/commentaries/models/paginated-commentaty.model';
import { CommentariesService } from 'src/commentaries/services/commentaries.service';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedFavourite } from 'src/favourites/models/paginated-favourite.model';
import { FavouriteService } from 'src/favourites/services/favourite.service';
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
    private favouriteService: FavouriteService,
    private postReactionService: PostReactionsService,
    private commentaryReactionService: CommentaryReactionService,
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

  @ResolveField('favourites', () => PaginatedFavourite)
  favourites(@Parent() author: UserModel, @Args() paginateArgs: PaginateArgs) {
    return this.favouriteService.getUserFavourites(author.id, paginateArgs);
  }
}
