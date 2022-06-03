import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryReactionModule } from 'src/comment-reaction/comment-reaction.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentaryRepository } from './commentary.repository';
import { CommentaryResolver } from './resolvers/commentary.resolver';
import { CommentaryMutationResolver } from './resolvers/mutation/commentary-mutation.resolver';
import { CommentaryService } from './services/commentary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentaryRepository, PostsRepository]),
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
