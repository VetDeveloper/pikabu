import { ArgsType, Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';
import { CreatePostReactionInput } from './create-post-reaction.input';

@InputType()
export class UpdatePostReactionInput extends PickType(PartialType(CreatePostReactionInput), ['reaction']) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
