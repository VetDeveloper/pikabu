import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryReactionModule } from 'src/comment-reaction/comment-reaction.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentariesRepository } from './commentaries.repository';
import { CommentariesResolver } from './resolvers/commentaries.resolver';
import { CommentaryMutationResolver } from './resolvers/mutation/commentaries-mutation.resolver';
import { CommentariesService } from './services/commentaries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentariesRepository, PostsRepository]),
    CommentaryReactionModule,
  ],
  exports: [CommentariesService],
  providers: [
    CommentaryMutationResolver,
    CommentariesService,
    CommentariesResolver,
  ],
})
export class CommentariesModule {}
