import { NestDataLoader } from '@app/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PostsEntity } from '../entities/posts.entity';
import { PostsRepository } from '../posts.repository';

@Injectable()
export class PostsLoader implements NestDataLoader<number, PostsEntity> {
  constructor(private readonly repo: PostsRepository) {}

  generateDataLoader(): DataLoader<number, PostsEntity> {
    return new DataLoader<number, PostsEntity>(async (keys) => {
      const uniqueKeys: number[] = [...new Set(keys)];
      const posts = await this.repo.findByIds(uniqueKeys);
      return keys.map(
        (key) =>
          posts.find((post) => post.id === key) ||
          new Error(`Could not load post with id: ${key}`),
      );
    });
  }
}
