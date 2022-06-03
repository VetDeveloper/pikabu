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
import { DeleteFavouriteArgs } from 'src/favourites/args/delete-favourite.args';
import { FavouriteOwnerGuard } from 'src/favourites/guards/favourite-owner.guard';
import { CreateFavouriteInput } from 'src/favourites/inputs/create-favourite.input';
import { FavouriteModel } from 'src/favourites/models/favourite.model';
import { FavouriteService } from 'src/favourites/services/favourite.service';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UserModel } from 'src/users/models/user.model';
import * as DataLoader from 'dataloader';
import { UsersEntity } from 'src/users/entities/users.entity';

@Resolver(() => FavouriteModel)
export class FavouriteResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() favourite: FavouriteModel,
    @Loader(UsersLoader) userLoader: DataLoader<number, UsersEntity>,
  ) {
    return userLoader.load(favourite.userId);
  }
}
