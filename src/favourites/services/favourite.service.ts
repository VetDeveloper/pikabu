import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentariesRepository } from 'src/commentaries/commentaries.repository';
import { CommentariesEntity } from 'src/commentaries/entities/commentaries.entity';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { FavouritesEntity } from '../entities/favourites.entity';
import { EntityType } from '../enums/entity-type.enum';
import { FavouritesRepository } from '../favourites.repository';
import { CreateFavouriteInput } from '../inputs/create-favourite.input';

@Injectable()
export class FavouriteService {
  constructor(
    private favouritesRepository: FavouritesRepository,
    private postRepository: PostsRepository,
    private commentaryRepository: CommentariesRepository,
  ) {}

  async createFavourite(
    userId: number,
    dto: CreateFavouriteInput,
  ): Promise<FavouritesEntity> {
    switch (dto.entityType) {
      case EntityType.POST:
        const post: PostsEntity = await this.postRepository.findOne(
          dto.entityId,
        );
        if (!post) {
          throw new NotFoundException();
        }
        break;
      case EntityType.COMMENTARY:
        const commentary: CommentariesEntity =
          await this.commentaryRepository.findOne(dto.entityId);
        if (!commentary) {
          throw new NotFoundException();
        }
        break;
    }

    return this.favouritesRepository.save({
      ...dto,
      userId: userId,
    });
  }

  async deleteOne(id: number) {
    const entity: FavouritesEntity = await this.favouritesRepository.findOne(
      id,
    );
    if (!entity) {
      throw new NotFoundException();
    }
    await this.favouritesRepository.delete(id);
    return entity;
  }

  getUserFavourites(userId: number, paginateArgs: PaginateArgs) {
    return this.favouritesRepository.getUserFavourites(userId, paginateArgs);
  }
}
