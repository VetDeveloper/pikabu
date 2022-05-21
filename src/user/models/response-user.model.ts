import { ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { UserModel } from "./user.model";

@ObjectType()
export class ResponseUser extends OmitType(UserModel, ['password']) {}