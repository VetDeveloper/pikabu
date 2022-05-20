import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginateInput {
  @Field(() => Int, { defaultValue: 100 })
  limit: number;

  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field({ nullable: true })
  route?: string;

  @Field({ nullable: true })
  countQueries?: boolean;
}
