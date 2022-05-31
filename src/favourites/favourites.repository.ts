import { EntityRepository, Repository } from "typeorm";
import { FavouritesEntity } from "./entities/favourites.entity";

@EntityRepository(FavouritesEntity)
export class FavouritesRepository extends Repository<FavouritesEntity> {}