import {
  Args,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/inputs/create-user.input';
import { AuthResponse } from 'src/auth/models/auth-response.model';
import { UserModel } from 'src/user/models/user.model';
import { UserService } from 'src/user/services/user.service';



@Resolver(UserModel)
export class UserQueryResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => [UserModel])
  getUsers() {
    return this.userService.getAllUsers();
  }
}
