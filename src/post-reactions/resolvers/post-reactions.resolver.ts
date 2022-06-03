import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostReactionModel } from '../models/post-reaction.model';
import { PostReactionsService } from '../services/post-reactions.service';
import { UserModel } from 'src/users/models/user.model';
import { Loader } from '@app/dataloader';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UsersEntity } from 'src/users/entities/users.entity';
import * as DataLoader from 'dataloader';
import { PostModel } from 'src/post/models/post.model';
import { PostLoader } from 'src/post/dataloader/post.loader';
import { PostEntity } from 'src/post/entities/post.entity';

@Resolver(() => PostReactionModel)
export class PostReactionsResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() postReaction: PostReactionModel,
    @Loader(UsersLoader) userLoader: DataLoader<number, UsersEntity>,
  ) {
    return userLoader.load(postReaction.userId);
  }

  @ResolveField(() => PostModel)
  post(
    @Parent() postReaction: PostReactionModel,
    @Loader(PostLoader) postLoader: DataLoader<number, PostEntity>,
  ) {
    return postLoader.load(postReaction.postId);
  }
}
