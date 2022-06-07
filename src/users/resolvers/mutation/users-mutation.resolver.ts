import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateUserInput } from 'src/users/inputs/create-user.input';
import { UpdateUserInput } from 'src/users/inputs/update-user.input';
import { AuthResponse } from 'src/auth/models/auth-response.model';
import { UserModel } from 'src/users/models/user.model';
import { UserService } from 'src/users/services/users.service';

@Resolver(UserModel)
@UseGuards(GqlAuthGuard)
export class UsersMutationResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  updateUser(
    @GetUser('id') id: number,
    @Args('updateUserArgs') dto: UpdateUserInput,
  ) {
    return this.userService.updateOneUser(id, dto);
  }

  @Mutation(() => UserModel)
  deleteUser(@GetUser('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
