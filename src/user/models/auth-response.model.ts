import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseUser } from "./response-user.model";
import { UserModel } from "./user.model";

@ObjectType()
export class AuthResponse {
    @Field()
    user : ResponseUser
    @Field()
    accessToken: string
}