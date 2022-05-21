import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserResolver],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
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
