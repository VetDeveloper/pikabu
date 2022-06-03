import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryRepository } from 'src/commentary/commentary.repository';
import { PostsRepository } from 'src/posts/posts.repository';
import { FavouritesRepository } from './favourites.repository';
import { FavouriteResolver } from './resolvers/favourite.resolver';
import { FavouriteMutationResolver } from './resolvers/mutation/mutation-favourite.resolver';
import { FavouriteService } from './services/favourite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavouritesRepository,
      PostsRepository,
      CommentaryRepository,
    ]),
  ],
  exports: [FavouriteService],
  providers: [FavouriteService, FavouriteMutationResolver, FavouriteResolver],
})
export class FavouritesModule {}
