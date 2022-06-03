import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Reaction } from '../../common/enums/reaction.enum';

@ObjectType()
export class PostReactionModel {
  @Field(() => ID)
  id: number;

  @Field(() => Reaction)
  reaction: Reaction;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
