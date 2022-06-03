import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLoader } from 'src/post/dataloader/post.loader';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/post.repository';
import { UserRepository } from './users.repository';
import { UsersResolver } from './resolvers/users.resolver';
import { UserService } from './services/users.service';
import { UsersQueryResolver } from './resolvers/query/users-query.resolver';
import { UsersMutationResolver } from './resolvers/mutation/users-mutation.resolver';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { PostReactionsModule } from 'src/post-reactions/post-reactions.module';
import { CommentaryReactionModel } from 'src/comment-reaction/models/commentary-reaction.model';
import { CommentaryModule } from 'src/commentary/commentary.module';
import { CommentaryReactionModule } from 'src/comment-reaction/comment-reaction.module';

@Module({
  providers: [
    UserService,
    UsersResolver,
    UsersQueryResolver,
    UsersMutationResolver,
    PostLoader,
  ],
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostRepository]),
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
    PostModule,
    FavouritesModule,
    PostReactionsModule,
    CommentaryReactionModule,
    CommentaryModule,
  ],
  exports: [UserService],
})
export class UsersModule {}
