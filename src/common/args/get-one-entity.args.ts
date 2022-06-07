import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class GetOneEntityArgs {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
