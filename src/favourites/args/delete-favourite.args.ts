import { ArgsType, Field } from "@nestjs/graphql";
import { IsInt, IsPositive } from "class-validator";

@ArgsType()
export class DeleteFavouriteArgs {
    @Field()
    @IsInt()
    @IsPositive()
    id: number;
}