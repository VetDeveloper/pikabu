import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentaryRepository } from 'src/commentary/commentary.repository';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { PostRepository } from 'src/post/post.repository';
import { FavouritesEntity } from '../entities/favourites.entity';
import { EntityType } from '../enums/entity-type.enum';
import { FavouritesRepository } from '../favourites.repository';
import { CreateFavouriteInput } from '../inputs/create-favourite.input';

@Injectable()
export class FavouriteService {
  constructor(
    private favouritesRepository: FavouritesRepository,
    private postRepository: PostRepository,
    private commentaryRepository: CommentaryRepository,
  ) {}

  async createFavourite(
    userId: number,
    dto: CreateFavouriteInput,
  ): Promise<FavouritesEntity> {
    switch (dto.entityType) {
      case EntityType.POST:
        const post: PostEntity = await this.postRepository.findOne(
          dto.entityId,
        );
        if (!post) {
          throw new NotFoundException();
        }
        break;
      case EntityType.COMMENTARY:
        const commentary: CommentaryEntity =
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
    const entity: FavouritesEntity = await this.favouritesRepository.findOne(id);
    if(!entity) {
      throw new NotFoundException();
    }
    await this.favouritesRepository.delete(id);
    return entity;
  }
}
