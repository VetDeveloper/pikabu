import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { CommentaryReactionRepository } from './comment-reaction.repository';
import { CommentaryReactionResolver } from './resolvers/commentary-reaction.resolver';
import { CommentariReactionMutationResolver } from './resolvers/mutation/commentary-reaction-mutation.resolver';
import { CommentaryReactionService } from './services/commentary-reaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentaryReactionRepository,
      CommentariesRepository,
    ]),
  ],
  providers: [
    CommentaryReactionResolver,
    CommentaryReactionService,
    CommentariReactionMutationResolver,
  ],
  exports: [CommentaryReactionService],
})
export class CommentaryReactionModule {}
