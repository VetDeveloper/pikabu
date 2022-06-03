import { Loader } from '@app/dataloader';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { DeleteFavoriteArgs } from 'src/favorites/args/delete-favorite.args';
import { FavoriteOwnerGuard } from 'src/favorites/guards/favorite-owner.guard';
import { CreateFavoriteInput } from 'src/favorites/inputs/create-favorite.input';
import { FavoriteModel } from 'src/favorites/models/favorite.model';
import { FavoriteService } from 'src/favorites/services/favorite.service';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UserModel } from 'src/users/models/user.model';
import * as DataLoader from 'dataloader';
import { UsersEntity } from 'src/users/entities/users.entity';

@Resolver(() => FavoriteModel)
export class FavoriteResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() favourite: FavoriteModel,
    @Loader(UsersLoader) userLoader: DataLoader<number, UsersEntity>,
  ) {
    return userLoader.load(favourite.userId);
  }
}
