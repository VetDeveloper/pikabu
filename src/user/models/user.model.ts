import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostModel } from 'src/post/models/post.model';
import { PostEntity } from 'src/post/post.entity';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
