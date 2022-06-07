import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentaryReactionsRepository } from './repositories/commentary-reactions.repository';
import { PostReactionsRepository } from './repositories/post-reaction.repository';
import { CommentaryReactionsResolver } from './resolvers/commentary-reactions.resolver';
import { CommentariReactionsMutationResolver } from './resolvers/mutation/commentary-reactions-mutation.resolver';
import { PostReactionsMutationResolver } from './resolvers/mutation/mutation-post-reactions.resolver';
import { PostReactionsResolver } from './resolvers/post-reactions.resolver';
import { CommentariReactionsQueryResolver } from './resolvers/query/commentary-reactions-query.resolver';
import { QueryPostReactionsResolver } from './resolvers/query/query-post-reactions.resolver';
import { CommentaryReactionsService } from './services/commentary-reactions.service';
import { PostReactionsService } from './services/post-reactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentaryReactionsRepository,
      CommentariesRepository,
      PostReactionsRepository,
      PostsRepository,
    ]),
  ],
  providers: [
    CommentaryReactionsResolver,
    CommentaryReactionsService,
    CommentariReactionsMutationResolver,
    CommentariReactionsQueryResolver,
    PostReactionsService,
    PostReactionsResolver,
    PostReactionsMutationResolver,
    QueryPostReactionsResolver,
  ],
  exports: [CommentaryReactionsService, PostReactionsService],
})
export class ReactionsModule {}
