import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

@ArgsType()
export class PaginateArgs {
  @Field(() => Int, {defaultValue: 15})
  @IsNumber()
  @IsInt()
  @IsPositive()
  limit: number;

  @Field(() => Int, {defaultValue: 1})
  @IsNumber()
  @IsInt()
  @IsPositive()
  page: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  route?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  countQueries?: boolean;
}

export const defaultPaginateInput: PaginateArgs = {
  limit: 20,
  page: 1
};
