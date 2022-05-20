import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsPositive, IsString, Length } from 'class-validator';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
