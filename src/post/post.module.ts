import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentaryModule } from 'src/commentary/commentary.module';
import { FavouritesRepository } from 'src/favourites/favourites.repository';
import { PostReactionModule } from 'src/post-reaction/post-reaction.module';
import { UsersLoader } from 'src/users/dataloader/users.loader';
import { UserRepository } from 'src/users/users.repository';
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
    UsersLoader,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      UserRepository,
      FavouritesRepository,
    ]),
    CommentaryModule,
    PostReactionModule,
  ],
  exports: [PostService],
})
export class PostModule {}
