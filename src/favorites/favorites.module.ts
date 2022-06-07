import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { FavoritesRepository } from './favorites.repository';
import { FavoriteResolver } from './resolvers/favorite.resolver';
import { FavoriteMutationResolver } from './resolvers/mutation/mutation-favorite.resolver';
import { QueryFavoriteResolver } from './resolvers/query/query-favorite.resolver';
import { FavoriteService } from './services/favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesRepository,
      PostsRepository,
      CommentariesRepository,
    ]),
  ],
  exports: [FavoriteService],
  providers: [
    FavoriteService,
    FavoriteMutationResolver,
    FavoriteResolver,
    QueryFavoriteResolver,
  ],
})
export class FavoritesModule {}
