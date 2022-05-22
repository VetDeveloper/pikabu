import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLoader } from 'src/post/dataloader/post.loader';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/post.repository';
import { UserRepository } from './user.repository';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserQueryResolver } from './resolvers/query/user-query.resolver';
import { UserMutationResolver } from './resolvers/mutation/user-mutation.resolver';

@Module({
  providers: [UserService, UserResolver, UserQueryResolver, UserMutationResolver, PostLoader],
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
  ],
  exports: [UserService],
})
export class UserModule {}
