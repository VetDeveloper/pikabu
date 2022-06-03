import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { CommentaryReactionsEntity } from 'src/comment-reactions/entities/commentary-reactions.entity';
import { Reaction } from 'src/common/enums/reaction.enum';

define(CommentaryReactionsEntity, (faker: typeof Faker) => {
  const commentaryReaction: CommentaryReactionsEntity =
    new CommentaryReactionsEntity();
  const reaction: Reaction =
    Math.random() < 0.5 ? Reaction.DISLIKE : Reaction.LIKE;
  commentaryReaction.reaction = reaction;
  return commentaryReaction;
});
