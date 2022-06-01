import { define } from "typeorm-seeding";
import * as Faker from 'faker';
import { FavouritesEntity } from "src/favourites/entities/favourites.entity";

define(FavouritesEntity, (faker: typeof Faker) => {
    const favourite: FavouritesEntity = new FavouritesEntity();
    return favourite;
  });