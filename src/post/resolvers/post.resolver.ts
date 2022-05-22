import {
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from 'src/user/models/user.model';
import { PostModel } from '../models/post.model';
import { Loader } from '@app/dataloader';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserEntity } from 'src/user/entities/user.entity';
import * as DataLoader from 'dataloader';

@Resolver(() => PostModel)
export class PostResolver {
  @ResolveField(() => UserModel)
  user(
    @Parent() post: PostModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
  ) {
    return userLoader.load(post.userId);
  }
}
