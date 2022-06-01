import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt, IsPositive } from "class-validator";

@ArgsType()
export class DeleteFavouriteArgs {
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    id: number;
}