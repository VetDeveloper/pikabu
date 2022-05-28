import { NestDataLoader } from "@app/dataloader";
import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { CommentaryRepository } from "../commentary.repository";
import { CommentaryEntity } from "../entities/commentary.entity";

@Injectable()
export class CommentaryLoader implements NestDataLoader<number, CommentaryEntity> {
  constructor(private readonly repo: CommentaryRepository) { }

  generateDataLoader(): DataLoader<number, CommentaryEntity> {
    return new DataLoader<number, CommentaryEntity>(async (keys) => {
      const uniqueKeys : number[] = [...new Set(keys)];
      const commentaries : CommentaryEntity[] = await this.repo.findByIds(uniqueKeys);
      return keys.map(
        (key) =>
          commentaries.find((post) => post.id === key) ||
          new Error(`Could not load post with id: ${key}`),
      );

    });
  }
}