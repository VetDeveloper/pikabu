import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';

define(FavoritesEntity, (faker: typeof Faker) => {
  const favourite: FavoritesEntity = new FavoritesEntity();
  return favourite;
});
