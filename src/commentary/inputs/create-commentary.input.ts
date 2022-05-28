import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ImageModel } from 'src/common/models/image.model';
import { ImageInput } from 'src/post/inputs/image.input';

@InputType()
export class CreateCommentaryInput {
  @Field({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  text?: string;

  @Field(() => [ImageInput], { defaultValue: [] })
  @IsOptional()
  images?: Array<ImageInput>;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  postId: number;
}
