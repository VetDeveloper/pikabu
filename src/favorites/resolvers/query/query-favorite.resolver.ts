import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetOneEntityArgs } from 'src/common/args/get-one-entity.args';
import { FavoriteModel } from 'src/favorites/models/favorite.model';
import { FavoriteService } from 'src/favorites/services/favorite.service';

@Resolver(() => FavoriteModel)
export class QueryFavoriteResolver {
  constructor(private favoriteService: FavoriteService) {}

  @Query(() => FavoriteModel)
  getFavorite(@Args() args: GetOneEntityArgs) {
    return this.favoriteService.findOne(args.id);
  }
}
