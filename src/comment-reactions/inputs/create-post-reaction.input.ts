import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { Reaction } from '../../common/enums/reaction.enum';

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
