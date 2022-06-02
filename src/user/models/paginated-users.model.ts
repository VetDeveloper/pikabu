import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/common/paginate/paginated-type.function";
import { UserModel } from "./user.model";

@ObjectType()
export class PaginatedUsers extends Paginated(UserModel) {}