import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/common/paginate/paginated-type.function";
import { PostReactionModel } from "./post-reaction.model";

@ObjectType()
export class PaginatedPostReaction extends Paginated(PostReactionModel) {}