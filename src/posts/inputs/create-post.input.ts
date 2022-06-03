import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { ImageInput } from "./image.input";
import JSON from 'graphql-type-json';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => [ImageInput], { nullable: true })
  @IsOptional()
  images?: Array<ImageInput>;

  @Field(() => [String], {nullable: true})
  @IsString({ each: true })
  @IsOptional()
  tags?: Array<string>;
}