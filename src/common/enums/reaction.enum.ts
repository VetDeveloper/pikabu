import { registerEnumType } from "@nestjs/graphql";

export enum Reaction {
    LIKE = 'like',
    DISLIKE = 'dislike'
}

registerEnumType(Reaction, {
    name: 'Reaction',
  });