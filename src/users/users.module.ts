import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsLoader } from 'src/posts/dataloader/posts.loader';
import { PostsModule } from 'src/posts/posts.module';
import { PostsRepository } from 'src/posts/posts.repository';
import { UserRepository } from './users.repository';
import { UsersResolver } from './resolvers/users.resolver';
import { UserService } from './services/users.service';
import { UsersQueryResolver } from './resolvers/query/users-query.resolver';
import { UsersMutationResolver } from './resolvers/mutation/users-mutation.resolver';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { CommentaryReactionModel } from 'src/comment-reactions/models/commentary-reaction.model';
import { CommentariesModule } from 'src/commentaries/commentaries.module';
import { ReactionsModule } from 'src/comment-reactions/reactions.module';

@Module({
  providers: [
    UserService,
    UsersResolver,
    UsersQueryResolver,
    UsersMutationResolver,
    PostsLoader,
  ],
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostsRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRESIN_TIME'),
        },
      }),
    }),
    PostsModule,
    FavoritesModule,
    ReactionsModule,
    CommentariesModule,
  ],
  exports: [UserService],
})
export class UsersModule {}
