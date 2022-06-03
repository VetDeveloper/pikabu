import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/common/paginate/paginated-type.function";
import { CommentaryModel } from "./commentary.model";

@ObjectType()
export class PaginatedCommentary extends Paginated(CommentaryModel) {}