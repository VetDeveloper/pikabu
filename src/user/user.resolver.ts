import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { defaultPaginateInput, PaginateInput } from 'src/post/inputs/paginate.input';
import { PaginatedPost } from 'src/post/models/paginated-post.model';
import { PostModel } from 'src/post/models/post.model';
import { PostService } from 'src/post/post.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { AuthResponse } from './models/auth-response.model';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private postService: PostService,
  ) {}

  @Query(() => [UserModel])
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

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @GetUser() user: UserModel,
    @Args('updateUserArgs') dto: UpdateUserInput,
  ) {
    return this.userService.updateOneUser(user.id, dto);
  }

  @ResolveField('posts', () => PaginatedPost)
  posts(
    @Parent() author: UserModel,
    @Args('paginateArgs', {
      defaultValue: defaultPaginateInput,
    })
    args: PaginateInput,
  ) {
    const { id } = author;
    return this.postService.getPosts(args);
  }
}
