import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@ArgsType()
export class SearchArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchValue?: string;
}
