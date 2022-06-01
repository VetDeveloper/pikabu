import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/common/paginate/paginated-type.function";
import { FavouritesEntity } from "../entities/favourites.entity";
import { FavouriteModel } from "./favourite.model";

@ObjectType()
export class PaginatedFavourite extends Paginated(FavouriteModel) {}