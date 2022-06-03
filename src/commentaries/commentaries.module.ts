import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionsModule } from 'src/comment-reactions/reactions.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentariesRepository } from './commentaries.repository';
import { CommentariesResolver } from './resolvers/commentaries.resolver';
import { CommentaryMutationResolver } from './resolvers/mutation/commentaries-mutation.resolver';
import { CommentaryQueryResolver } from './resolvers/query/commentaries-query.resolver';
import { CommentariesService } from './services/commentaries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentariesRepository, PostsRepository]),
    ReactionsModule,
  ],
  exports: [CommentariesService],
  providers: [
    CommentaryMutationResolver,
    CommentariesService,
    CommentariesResolver,
    CommentaryQueryResolver,
  ],
})
export class CommentariesModule {}
