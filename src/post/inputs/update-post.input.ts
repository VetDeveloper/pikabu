import { Field, ID, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsPositive } from "class-validator";
import { CreatePostInput } from "./create-post.input";

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    postId: number;
}
