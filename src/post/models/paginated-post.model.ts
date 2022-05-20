import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/common/paginate/paginated-type.function";
import { PostModel } from "./post.model";

@ObjectType()
export class PaginatedPost extends Paginated(PostModel) {}
