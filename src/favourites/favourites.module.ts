import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryRepository } from 'src/commentary/commentary.repository';
import { PostRepository } from 'src/post/post.repository';
import { FavouritesRepository } from './favourites.repository';
import { FavouriteMutationResolver } from './resolvers/mutation/mutation-favourite.resolver';
import { FavouriteService } from './services/favourite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavouritesRepository, PostRepository, CommentaryRepository])],
  exports: [FavouriteService],
  providers: [FavouriteService, FavouriteMutationResolver],
})
export class FavouritesModule {}
