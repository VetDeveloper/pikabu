import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNumber, IsPositive, IsString } from "class-validator";

@InputType()
export class ImageInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @IsPositive()
  order: number;

  @Field()
  @IsString()
  link: string;
}
