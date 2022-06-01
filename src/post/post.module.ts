import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryModule } from 'src/commentary/commentary.module';
import { FavouritesRepository } from 'src/favourites/favourites.repository';
import { PostReactionModule } from 'src/post-reaction/post-reaction.module';
import { UserLoader } from 'src/user/dataloader/user.loader';
import { UserRepository } from 'src/user/user.repository';
import { PostRepository } from './post.repository';
import { PostMutationResolver } from './resolvers/mutation/post-mutation.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { PostQueryResolver } from './resolvers/query/post-query.resolver';
import { PostService } from './services/post.service';

@Module({
  providers: [
    PostService,
    PostResolver,
    PostQueryResolver,
    PostMutationResolver,
    UserLoader,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      UserRepository,
      FavouritesRepository,
    ]),
    CommentaryModule,
    PostReactionModule
  ],
  exports: [PostService],
})
export class PostModule {}
