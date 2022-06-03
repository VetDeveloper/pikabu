import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Reaction } from 'src/common/enums/reaction.enum';
import { PostReactionsEntity } from 'src/post-reactions/entities/post-reactions.entity';

define(PostReactionsEntity, (faker: typeof Faker) => {
  const postReaction: PostReactionsEntity = new PostReactionsEntity();
  const reaction: Reaction =
    Math.random() < 0.5 ? Reaction.DISLIKE : Reaction.LIKE;
  postReaction.reaction = reaction;
  return postReaction;
});
