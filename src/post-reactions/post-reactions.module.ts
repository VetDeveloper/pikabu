import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostReactionsRepository } from './post-reaction.repository';
import { PostReactionsMutationResolver } from './resolvers/mutation/mutation-post-reactions.resolver';
import { PostReactionsResolver } from './resolvers/post-reactions.resolver';
import { PostReactionsService } from './services/post-reactions.service';

@Module({
  providers: [
    PostReactionsService,
    PostReactionsResolver,
    PostReactionsMutationResolver,
  ],
  imports: [
    TypeOrmModule.forFeature([PostReactionsRepository, PostsRepository]),
  ],
  exports: [PostReactionsService],
})
export class PostReactionsModule {}
