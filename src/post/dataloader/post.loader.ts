import { NestDataLoader } from "@app/dataloader";
import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { PostEntity } from "../entities/post.entity";
import { PostRepository } from "../post.repository";

@Injectable()
export class PostLoader implements NestDataLoader<number, PostEntity> {
  constructor(private readonly repo: PostRepository) { }

  generateDataLoader(): DataLoader<number, PostEntity> {
    return new DataLoader<number, PostEntity>(async (keys) => {
      const uniqueKeys : number[] = [...new Set(keys)];
      const posts = await this.repo.findByIds(uniqueKeys);
      return keys.map(
        (key) =>
          posts.find((post) => post.id === key) ||
          new Error(`Could not load post with id: ${key}`),
      );

    });
  }
}
