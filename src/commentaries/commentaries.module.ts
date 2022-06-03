import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryReactionsModule } from 'src/comment-reactions/commentary-reactions.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentariesRepository } from './commentaries.repository';
import { CommentariesResolver } from './resolvers/commentaries.resolver';
import { CommentaryMutationResolver } from './resolvers/mutation/commentaries-mutation.resolver';
import { CommentariesService } from './services/commentaries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentariesRepository, PostsRepository]),
    CommentaryReactionsModule,
  ],
  exports: [CommentariesService],
  providers: [
    CommentaryMutationResolver,
    CommentariesService,
    CommentariesResolver,
  ],
})
export class CommentariesModule {}
