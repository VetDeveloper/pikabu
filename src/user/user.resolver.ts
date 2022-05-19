import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { CreateUserInput } from "./inputs/create-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";
import { UserModel } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => UserModel)
  registrateNewUser(@Args('newUserArgs') newUserArgs: CreateUserInput) {
    return this.userService.registrateOne(newUserArgs);
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard) ////////////// доделать логин и регистрацию
  updateUser(
    @GetUser() user: UserModel,
    @Args('updateUserArgs') dto: UpdateUserInput,
  ) {
    return this.userService.updateOneUser(1, dto);
  }
}
