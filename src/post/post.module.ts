import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  providers: [PostService, PostResolver],
  imports: [TypeOrmModule.forFeature([PostRepository])],
})
export class PostModule {}
