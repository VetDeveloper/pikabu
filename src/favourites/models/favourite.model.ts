import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { EntityType } from '../enums/entity-type.enum';

@ObjectType()
export class FavouriteModel {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  entityId: number;

  @Field(() => EntityType)
  entityType: EntityType;
}
