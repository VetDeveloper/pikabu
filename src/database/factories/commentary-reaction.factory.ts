import { define } from "typeorm-seeding";
import * as Faker from 'faker';
import { CommentaryReactionEntity } from "src/comment-reaction/entities/comment-reaction.entity";
import { Reaction } from "src/common/enums/reaction.enum";

define(CommentaryReactionEntity, (faker: typeof Faker) => {
    const commentaryReaction: CommentaryReactionEntity = new CommentaryReactionEntity();
    const reaction : Reaction = Math.random() < 0.5? Reaction.DISLIKE: Reaction.LIKE
    commentaryReaction.reaction = reaction;
    return commentaryReaction;
  });