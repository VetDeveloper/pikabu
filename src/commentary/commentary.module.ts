import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryReactionModule } from 'src/comment-reaction/comment-reaction.module';
import { PostRepository } from 'src/post/post.repository';
import { CommentaryRepository } from './commentary.repository';
import { CommentaryResolver } from './resolvers/commentary.resolver';
import { CommentaryMutationResolver } from './resolvers/mutation/commentary-mutation.resolver';
import { CommentaryService } from './services/commentary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentaryRepository, PostRepository]),
    CommentaryReactionModule,
  ],
  exports: [CommentaryService],
  providers: [
    CommentaryMutationResolver,
    CommentaryService,
    CommentaryResolver,
  ],
})
export class CommentaryModule {}
