import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class DeleteFavoriteArgs {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
