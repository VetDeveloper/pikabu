import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { ImageModel } from "src/common/models/image.model";

@ObjectType()
export class CommentaryModel {
    @Field(() => ID)
    id: number;
  
    @Field({
        nullable: true
    })
    text?: string;
  
    @Field(() => [ImageModel], {
        defaultValue: []
    })
    images: Array<ImageModel>;
  
    @Field(() => Int)
    userId: number;
  
    @Field(() => Int)
    postId: number;

    @Field()
    createdAt: Date;
  
    @Field()
    updatedAt: Date;
  }