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

@Resolver(() => FavoriteModel)
export class FavoriteMutationResolver {
  constructor(private favouriteService: FavoriteService) {}

  @Mutation(() => FavoriteModel)
  @UseGuards(GqlAuthGuard)
  createFavourite(
    @Args('createFavouriteInput') createFavouriteInput: CreateFavoriteInput,
    @GetUser('id') userId: number,
  ) {
    return this.favouriteService.createFavourite(userId, createFavouriteInput);
  }

  @Mutation(() => FavoriteModel)
  @UseGuards(GqlAuthGuard, FavoriteOwnerGuard)
  deleteFavourite(@Args() deleteFavouriteArgs: DeleteFavoriteArgs) {
    return this.favouriteService.deleteOne(deleteFavouriteArgs.id);
  }
}
