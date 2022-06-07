import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/services/posts.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@app/dataloader';
import { PostsLoader } from './posts/dataloader/posts.loader';
import { CommentariesModule } from './commentaries/commentaries.module';
import { ReactionsModule } from './comment-reactions/reactions.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env.test',
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(5000),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(6432),
        DB_SYNCHRONIZE: Joi.boolean().default(true),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('POSTGRES_DB'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        port: configService.get<number>('POSTGRES_PORT'),
        entities: ['dist/**/*.entity.js'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: true,
        factories: ['dist/**/database/factories/**/*.js'],
        seeds: ['dist/**/database/seeds/**/*.js'],
      }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentariesModule,
    ReactionsModule,
    FavoritesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
