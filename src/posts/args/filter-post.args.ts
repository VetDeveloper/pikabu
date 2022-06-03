import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { PostsGroup } from '../enums/posts-group.enum';

@ArgsType()
export class FilterArgs {
  @Field(() => [String], {
    nullable: true,
  })
  @IsString({ each: true })
  @IsOptional()
  tags?: Array<string>;

  @Field(() => PostsGroup, {
    nullable: true,
  })
  @IsEnum(PostsGroup)
  @IsOptional()
  group?: PostsGroup;
}
