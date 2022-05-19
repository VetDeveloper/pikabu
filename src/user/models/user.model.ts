import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsPositive, IsString, Length } from 'class-validator';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  @IsInt()
  @IsPositive()
  id: number;

  @Field({ description: '' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(6)
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
