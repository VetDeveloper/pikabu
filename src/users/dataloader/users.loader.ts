import { NestDataLoader } from '@app/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UsersEntity } from '../entities/users.entity';
import { UserRepository } from '../users.repository';

@Injectable()
export class UsersLoader implements NestDataLoader<number, UsersEntity> {
  constructor(private readonly repo: UserRepository) {}

  generateDataLoader(): DataLoader<number, UsersEntity> {
    return new DataLoader<number, UsersEntity>(async (keys) => {
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
