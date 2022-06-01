import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/common/paginate/paginated-type.function";
import { CommentaryReactionModel } from "./commentary-reaction.model";

@ObjectType()
export class PaginatedCommentaryReaction extends Paginated(CommentaryReactionModel) {}