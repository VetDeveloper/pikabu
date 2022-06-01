import { Loader } from "@app/dataloader";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { DeleteFavouriteArgs } from "src/favourites/args/delete-favourite.args";
import { FavouriteOwnerGuard } from "src/favourites/guards/favourite-owner.guard";
import { CreateFavouriteInput } from "src/favourites/inputs/create-favourite.input";
import { FavouriteModel } from "src/favourites/models/favourite.model";
import { FavouriteService } from "src/favourites/services/favourite.service";
import { UserLoader } from "src/user/dataloader/user.loader";
import { UserModel } from "src/user/models/user.model";
import * as DataLoader from 'dataloader';
import { UserEntity } from "src/user/entities/user.entity";

@Resolver(() => FavouriteModel)
export class FavouriteResolver {

    @ResolveField(() => UserModel)
  user(
    @Parent() favourite: FavouriteModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
  ) {
    return userLoader.load(favourite.userId);
  }

}