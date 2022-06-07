import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserInput } from "src/users/inputs/create-user.input";
import { AuthResponse } from "src/auth/models/auth-response.model";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthResponse)
  login(@Args('loginUserArgs') dto: CreateUserInput) {
    return this.authService.login(dto);
  }

  @Mutation(() => AuthResponse)
  registrateNewUser(@Args('newUserArgs') newUserArgs: CreateUserInput) {
    return this.authService.registrateOne(newUserArgs);
  }
}