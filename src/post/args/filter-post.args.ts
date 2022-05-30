import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Group } from '../enums/group.enum';

@ArgsType()
export class FilterArgs {
  @Field(() => [String], {
    nullable: true,
  })
  @IsString({ each: true })
  @IsOptional()
  tags?: Array<string>;

  @Field(() => Group, {
    nullable: true,
  })
  @IsEnum(Group)
  @IsOptional()
  group?: Group;
}
