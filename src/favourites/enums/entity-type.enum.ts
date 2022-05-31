import { registerEnumType } from "@nestjs/graphql";

export enum EntityType {
  POST = 'post',
  COMMENTARY = 'commentary',
}

registerEnumType(EntityType, {
  name: 'EntityType'
})