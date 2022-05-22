import { NestDataLoader } from '@app/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserLoader implements NestDataLoader<number, UserEntity> {
  constructor(private readonly repo: UserRepository) {}

  generateDataLoader(): DataLoader<number, UserEntity> {
    return new DataLoader<number, UserEntity>(async (keys) => {
      const uniqueKeys: number[] = [...new Set(keys)];
      const users = await this.repo.findByIds(uniqueKeys);
      return keys.map(
        (key) =>
          users.find((user) => user.id === key) ||
          new Error(`Could not load post with id: ${key}`),
      );
    });
  }
}
