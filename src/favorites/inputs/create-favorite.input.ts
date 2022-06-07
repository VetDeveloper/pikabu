import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { EntityType } from '../enums/entity-type.enum';

@InputType()
export class CreateFavoriteInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  entityId: number;

  @Field(() => EntityType)
  @IsEnum(EntityType)
  entityType: EntityType;
}
