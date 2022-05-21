import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { createPostsLoader } from './post/dataloader/post.loader';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [PostModule],
      inject: [PostService],
      useFactory: (postService: PostService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: () => ({
          postsLoader: createPostsLoader(postService),
        }),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
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
      }),
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
})
export class AppModule {}
