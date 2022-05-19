import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { CreateUserInput } from "./inputs/create-user.input";
import { UpdateUserInput } from "./inputs/update-user.input";
import { AuthResponse } from "./models/auth-response.model";
import { ResponseUser } from "./models/response-user.model";
import { UserModel } from "./models/user.model";
import { UserService } from "./user.service";

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [ResponseUser])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => AuthResponse)
  login(@Args('loginUserArgs') dto: CreateUserInput) {
    return this.userService.login(dto);
  }

  @Mutation(() => AuthResponse)
  registrateNewUser(@Args('newUserArgs') newUserArgs: CreateUserInput) {
    return this.userService.registrateOne(newUserArgs);
  }

  @Mutation(() => ResponseUser)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @GetUser() user: UserModel,
    @Args('updateUserArgs') dto: UpdateUserInput,
  ) {
    return this.userService.updateOneUser(1, dto);
  }
}
