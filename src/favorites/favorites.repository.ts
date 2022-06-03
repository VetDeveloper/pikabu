import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { FavoritesEntity } from './entities/favorites.entity';
import { EntityType } from './enums/entity-type.enum';
import { FavoriteModel } from './models/favorite.model';

@EntityRepository(FavoritesEntity)
export class FavoritesRepository extends Repository<FavoritesEntity> {
  getUserFavourites(userId: number, paginateArgs: PaginateArgs) {
    const qb = this.createQueryBuilder('rep');
    qb.andWhere('rep.userId = :userId', {
      userId: userId,
    });
    return this.getPaginate(qb, paginateArgs);
  }

  async deletePostFavourites(postId: number) {
    const arr: FavoritesEntity[] = await this.find({
      where: {
        entityType: EntityType.POST,
        entityId: postId,
      },
    });
    this.remove(arr);
  }

  async deleteCommentaryFavourites(commentaryId: number) {
    const arr: FavoritesEntity[] = await this.find({
      where: {
        entityType: EntityType.COMMENTARY,
        entityId: commentaryId,
      },
    });
    await this.remove(arr);
  }

  private getPaginate(
    qb: SelectQueryBuilder<FavoritesEntity>,
    paginateArgs: PaginateArgs,
  ) {
    return paginate<FavoriteModel>(qb, paginateArgs);
  }
}
