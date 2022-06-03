import { Args, Query, Resolver } from "@nestjs/graphql";
import { GetOneEntityArgs } from "src/common/args/get-one-entity.args";
import { FavouriteModel } from "src/favourites/models/favourite.model";
import { FavouriteService } from "src/favourites/services/favourite.service";

@Resolver(() => FavouriteModel)
export class QueryFavoriteResolver {

    constructor(private favoriteService: FavouriteService) {}

    @Query(()=>FavouriteModel)
    getFavorite(
        @Args() args: GetOneEntityArgs
    ) {
        return this.favoriteService.findOne(args.id)
    }
}