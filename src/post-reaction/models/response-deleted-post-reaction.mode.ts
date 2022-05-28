import { Field, ObjectType } from "@nestjs/graphql";
import { PostReactionModel } from "./post-reaction.model";

@ObjectType()
export class ResponceDeletedPostReactionModel {
    @Field(() => PostReactionModel)
    postReaction: PostReactionModel

    @Field()
    reason: string;
}