import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ImageModel {
  @Field(() => Int)
  order: number;

  @Field()
  link: string;
}