import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { CreateFavouriteInput } from "src/favourites/inputs/create-favourite.input";
import { FavouriteModel } from "src/favourites/models/favourite.model";
import { FavouriteService } from "src/favourites/services/favourite.service";

@Resolver(() => FavouriteModel)
export class FavouriteMutationResolver {

    constructor(private favouriteService: FavouriteService) {}

    @Mutation(()=> FavouriteModel)
    @UseGuards(GqlAuthGuard)
    createFavourite(
        @Args('createFavouriteInput') createFavouriteInput: CreateFavouriteInput,
        @GetUser('id') userId: number
    ) {
        return this.favouriteService.createFavourite(userId, createFavouriteInput);
    }

}