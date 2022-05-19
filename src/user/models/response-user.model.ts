import { ObjectType, PickType } from "@nestjs/graphql";
import { UserModel } from "./user.model";

@ObjectType()
export class ResponseUser extends PickType(UserModel, ['id', 'email', 'createdAt', 'updatedAt']) {}