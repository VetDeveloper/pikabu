import { Loader } from '@app/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserModel } from 'src/user/models/user.model';
import { CommentaryModel } from '../models/commentary.model';
import * as DataLoader from 'dataloader';
import { UserEntity } from 'src/user/entities/user.entity';

@Resolver(() => CommentaryModel)
export class CommentaryResolver {
  @ResolveField('user', () => UserModel)
  author(
    @Parent() comment: CommentaryModel,
    @Loader(UserLoader) userLoader: DataLoader<number, UserEntity>,
  ) {
    return userLoader.load(comment.userId);
  }
}
