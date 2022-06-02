import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateUserInput } from 'src/user/inputs/create-user.input';
import { UpdateUserInput } from 'src/user/inputs/update-user.input';
import { AuthResponse } from 'src/auth/models/auth-response.model';
import { UserModel } from 'src/user/models/user.model';
import { UserService } from 'src/user/services/user.service';

@Resolver(UserModel)
@UseGuards(GqlAuthGuard)
export class UserMutationResolver {
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
