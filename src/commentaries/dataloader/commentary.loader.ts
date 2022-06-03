import { NestDataLoader } from '@app/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentariesRepository } from '../commentaries.repository';
import { CommentariesEntity } from '../entities/commentaries.entity';

@Injectable()
export class CommentaryLoader
  implements NestDataLoader<number, CommentariesEntity>
{
  constructor(private readonly repo: CommentariesRepository) {}

  generateDataLoader(): DataLoader<number, CommentariesEntity> {
    return new DataLoader<number, CommentariesEntity>(async (keys) => {
      const uniqueKeys: number[] = [...new Set(keys)];
      const commentaries: CommentariesEntity[] = await this.repo.findByIds(
        uniqueKeys,
      );
      return keys.map(
        (key) =>
          commentaries.find((post) => post.id === key) ||
          new Error(`Could not load post with id: ${key}`),
      );
    });
  }
}
