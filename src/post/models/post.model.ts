import { Field, ID, ObjectType} from "@nestjs/graphql";
import { ImageModel } from "../../common/models/image.model";
import JSON from 'graphql-type-json';
import { UserModel } from "src/users/models/user.model";

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ImageModel], {defaultValue: []})
  images: Array<ImageModel>;

  @Field(() => [String], { defaultValue: []})
  tags: Array<string>;

  @Field(() => ID)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // @Field(() => UserModel, { nullable: true })
  // user?: UserModel;
}
