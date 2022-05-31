import { Injectable } from '@nestjs/common';
import { FavouritesEntity } from '../entities/favourites.entity';
import { FavouritesRepository } from '../favourites.repository';
import { CreateFavouriteInput } from '../inputs/create-favourite.input';

@Injectable()
export class FavouriteService {
  constructor(private favouritesRepository: FavouritesRepository) {}

  createFavourite(
    userId: number,
    dto: CreateFavouriteInput,
  ): Promise<FavouritesEntity> {

    
    ////////////////// add logic for check exeptions

    return this.favouritesRepository.save({
      ...dto,
      userId: userId,
    });
  }
}
