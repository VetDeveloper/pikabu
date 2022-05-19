import { Field, InputType} from "@nestjs/graphql";
import { IsEmail, IsString, Length } from "class-validator";


@InputType()
export class CreateUserInput {
  @Field({ description: '' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(6)
  password: string;
}