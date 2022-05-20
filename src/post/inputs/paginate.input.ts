import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class PaginateInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @IsPositive()
  limit: number = 20;

  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @IsPositive()
  page: number = 1;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  route?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  countQueries?: boolean;
}

export const defaultPaginateInput: PaginateInput = {
  limit: 20,
  page: 1
};
