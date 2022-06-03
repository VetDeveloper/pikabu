import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { CommentaryReactionsRepository } from './commentary-reactions.repository';
import { CommentaryReactionsResolver } from './resolvers/commentary-reactions.resolver';
import { CommentariReactionsMutationResolver } from './resolvers/mutation/commentary-reactions-mutation.resolver';
import { CommentariReactionsQueryResolver } from './resolvers/query/commentary-reactions-query.resolver';
import { CommentaryReactionsService } from './services/commentary-reactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentaryReactionsRepository,
      CommentariesRepository,
    ]),
  ],
  providers: [
    CommentaryReactionsResolver,
    CommentaryReactionsService,
    CommentariReactionsMutationResolver,
    CommentariReactionsQueryResolver
  ],
  exports: [CommentaryReactionsService],
})
export class CommentaryReactionsModule {}
