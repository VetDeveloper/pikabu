import { OwnerGuard } from "src/common/guards/owner.guard";
import { FavouritesEntity } from "../entities/favourites.entity";

export class FavouriteOwnerGuard extends OwnerGuard<FavouritesEntity> {
    constructor() {
      super(FavouritesEntity);
    }
  }