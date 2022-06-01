import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FavouritesEntity } from './entities/favourites.entity';
import { EntityType } from './enums/entity-type.enum';
import { FavouriteModel } from './models/favourite.model';

@EntityRepository(FavouritesEntity)
export class FavouritesRepository extends Repository<FavouritesEntity> {
  getUserFavourites(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('rep');
    qb.andWhere('rep.userId = :userId', {
      userId: userId,
    });
    return this.getPaginate(qb, paginateArgs);
  }

  async deletePostFavourites(postId: number) {
    const arr: FavouritesEntity[] = await this.find({
      where: {
        entityType: EntityType.POST,
        entityId: postId
      }
    })
    this.remove(arr);
  }

  async deleteCommentaryFavourites(commentaryId: number) {
    const arr: FavouritesEntity[] = await this.find({
      where: {
        entityType: EntityType.COMMENTARY,
        entityId: commentaryId
      }
    })
    await this.remove(arr);
  }

  private getPaginate(
    qb: SelectQueryBuilder<FavouritesEntity>,
    paginateArgs: PaginateArgs,
  ) {
    return paginate<FavouriteModel>(qb, paginateArgs);
  }
}
