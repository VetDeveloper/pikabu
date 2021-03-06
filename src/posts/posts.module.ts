import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionsModule } from 'src/comment-reactions/reactions.module';
import { CommentariesModule } from 'src/commentaries/commentaries.module';
import { FavoritesRepository } from 'src/favorites/favorites.repository';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UserRepository } from 'src/users/users.repository';
import { PostsRepository } from './posts.repository';
import { PostsMutationResolver } from './resolvers/mutation/posts-mutation.resolver';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostsQueryResolver } from './resolvers/query/posts-query.resolver';
import { PostsService } from './services/posts.service';

@Module({
  providers: [
    PostsService,
    PostsResolver,
    PostsQueryResolver,
    PostsMutationResolver,
    UsersLoader,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PostsRepository,
      UserRepository,
      FavoritesRepository,
    ]),
    CommentariesModule,
    ReactionsModule,
  ],
  exports: [PostsService],
})
export class PostsModule {}
