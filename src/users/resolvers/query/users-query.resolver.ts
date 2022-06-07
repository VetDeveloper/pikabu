import { Args, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/inputs/create-user.input';
import { AuthResponse } from 'src/auth/models/auth-response.model';
import { UserModel } from 'src/users/models/user.model';
import { UserService } from 'src/users/services/users.service';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedUsers } from 'src/users/models/paginated-users.model';
import { GetOneEntityArgs } from 'src/common/args/get-one-entity.args';

@Resolver(UserModel)
export class UsersQueryResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => PaginatedUsers)
  getUsers(@Args() paginateArgs: PaginateArgs) {
    return this.userService.getAllUsers(paginateArgs);
  }

  @Query(() => UserModel)
  getUser(@Args() userId: GetOneEntityArgs) {
    return this.userService.findOne(userId.id);
  }
}
