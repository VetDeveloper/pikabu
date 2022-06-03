import { ArgsType, Field, Int, PickType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';
import { UpdatePostReactionInput } from '../inputs/update-post-reaction.args';

@ArgsType()
export class DeletePostReactionArgs {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
