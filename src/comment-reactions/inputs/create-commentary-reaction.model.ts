import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { Reaction } from 'src/common/enums/reaction.enum';

@InputType()
export class CreateCommentaryReactionInput {
  @Field(() => Reaction)
  @IsEnum(Reaction)
  reaction: Reaction;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  commentaryId: number;
}
