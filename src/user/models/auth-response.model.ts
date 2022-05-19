import { Field, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./user.model";

@ObjectType()
export class AuthResponse {
    @Field()
    user : UserModel
    @Field()
    accessToken: string
}