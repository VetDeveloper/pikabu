import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/paginate/paginated-type.function';
import { FavoritesEntity } from '../entities/favorites.entity';
import { FavoriteModel } from './favorite.model';

@ObjectType()
export class PaginatedFavorite extends Paginated(FavoriteModel) {}
