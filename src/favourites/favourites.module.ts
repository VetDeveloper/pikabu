import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesRepository } from './favourites.repository';
import { FavouriteMutationResolver } from './resolvers/mutation/mutation-favourite.resolver';
import { FavouriteService } from './services/favourite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavouritesRepository])],
  exports: [],
  providers: [FavouriteService, FavouriteMutationResolver],
})
export class FavouritesModule {}
