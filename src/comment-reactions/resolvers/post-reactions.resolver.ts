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
import { PostModel } from 'src/posts/models/post.model';
import { PostsLoader } from 'src/posts/dataloader/posts.loader';
import { PostsEntity } from 'src/posts/entities/posts.entity';

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
    @Loader(PostsLoader) postLoader: DataLoader<number, PostsEntity>,
  ) {
    return postLoader.load(postReaction.postId);
  }
}
