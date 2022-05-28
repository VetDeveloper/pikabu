import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { Reaction } from '../../common/types/reaction.enum';

@InputType()
export class CreatePostReactionInput {
  @Field(() => Reaction)
  @IsEnum(Reaction)
  reaction: Reaction;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  postId: number;
}
