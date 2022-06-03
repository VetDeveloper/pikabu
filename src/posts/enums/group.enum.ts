import { registerEnumType } from "@nestjs/graphql";

export enum Group {
    FRESH='fresh',
    HOT='hot',
    BEST='best'
}

registerEnumType(Group, {
    name: 'Group'
})