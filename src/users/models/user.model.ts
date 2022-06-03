import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostModel } from 'src/posts/models/post.model';
import { PostsEntity } from 'src/posts/entities/posts.entity';

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
