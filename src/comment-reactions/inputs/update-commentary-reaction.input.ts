import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';
import { CreateCommentaryReactionInput } from './create-commentary-reaction.model';

@InputType()
export class UpdateCommentaryReactionInput extends PickType(
  PartialType(CreateCommentaryReactionInput),
  ['reaction'],
) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  commentaryReactionId: number;
}
