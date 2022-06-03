import { Field, ID, InputType, Int, PartialType, PickType } from "@nestjs/graphql";
import { IsInt, IsPositive } from "class-validator";
import { CreateCommentaryInput } from "./create-commentary.input";

@InputType()
export class UpdateCommentaryInput extends PickType(PartialType(CreateCommentaryInput), ['images', 'text'])  {
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    id: number;
}