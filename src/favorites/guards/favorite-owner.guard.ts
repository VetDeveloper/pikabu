import { OwnerGuard } from 'src/common/guards/owner.guard';
import { FavoritesEntity } from '../entities/favorites.entity';

export class FavoriteOwnerGuard extends OwnerGuard<FavoritesEntity> {
  constructor() {
    super(FavoritesEntity);
  }
}
