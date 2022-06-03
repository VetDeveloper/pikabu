import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { FavouritesRepository } from './favourites.repository';
import { FavouriteResolver } from './resolvers/favourite.resolver';
import { FavouriteMutationResolver } from './resolvers/mutation/mutation-favourite.resolver';
import { QueryFavoriteResolver } from './resolvers/query/query-favorite.resolver';
import { FavouriteService } from './services/favourite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavouritesRepository,
      PostsRepository,
      CommentariesRepository,
    ]),
  ],
  exports: [FavouriteService],
  providers: [
    FavouriteService,
    FavouriteMutationResolver,
    FavouriteResolver,
    QueryFavoriteResolver,
  ],
})
export class FavouritesModule {}
