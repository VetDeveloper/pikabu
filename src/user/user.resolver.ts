import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { PaginatedPost } from 'src/post/models/paginated-post.model';
import { PostModel } from 'src/post/models/post.model';
import { PostService } from 'src/post/post.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { AuthResponse } from './models/auth-response.model';
import { ResponseUser } from './models/response-user.model';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private postService: PostService,
  ) {}

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
    return this.userService.updateOneUser(user.id, dto);
  }

  @ResolveField('posts' ,() => [PostModel])
  posts(@Parent() author: UserModel) {
    const { id } = author;
    return [this.postService.findOne(2)]
  }
}
