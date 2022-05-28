import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryRepository } from 'src/commentary/commentary.repository';
import { CommentaryReactionRepository } from './comment-reaction.repository';
import { CommentariReactionResolver } from './resolvers/commentary-reaction.resolver';
import { CommentaryReactionService } from './services/commentary-reaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentaryReactionRepository, CommentaryRepository])],
  providers: [CommentariReactionResolver, CommentaryReactionService],
  exports: [],
})
export class CommentReactionModule {}
