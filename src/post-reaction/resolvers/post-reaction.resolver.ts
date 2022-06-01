import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostReactionModel } from '../models/post-reaction.model';
import { PostReactionService } from '../services/post-reaction.service';
import { UserModel } from 'src/user/models/user.model';
import { Loader } from '@app/dataloader';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserEntity } from 'src/user/entities/user.entity';
import * as DataLoader from 'dataloader';
import { PostModel } from 'src/post/models/post.model';
import { PostLoader } from 'src/post/dataloader/post.loader';
import { PostEntity } from 'src/post/entities/post.entity';

@Resolver(() => PostReactionModel)
export class PostReactionResolver {

  @ResolveField(() => UserModel)
  user(
    @Parent() postReaction: PostReactionModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
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
