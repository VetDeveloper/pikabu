import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Reaction } from 'src/common/enums/reaction.enum';

@ObjectType()
export class CommentaryReactionModel {
  @Field(() => ID)
  id: number;

  @Field(() => Reaction)
  reaction: Reaction;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  commentaryId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
