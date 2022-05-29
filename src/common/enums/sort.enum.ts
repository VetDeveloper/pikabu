import { registerEnumType } from "@nestjs/graphql";

export enum Sort {
    CREATEDAT = 'createdAt',
    LIKES = 'likes'
}

registerEnumType(Sort, {
    name: 'Sort'
})