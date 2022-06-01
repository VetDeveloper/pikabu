import { define } from "typeorm-seeding";
import * as Faker from 'faker';
import { Reaction } from "src/common/enums/reaction.enum";
import { PostReactionEntity } from "src/post-reaction/entities/post-reaction.entity";

define(PostReactionEntity, (faker: typeof Faker) => {
    const postReaction: PostReactionEntity = new PostReactionEntity();
    const reaction : Reaction = Math.random() < 0.5? Reaction.DISLIKE: Reaction.LIKE
    postReaction.reaction = reaction;
    return postReaction;
  });