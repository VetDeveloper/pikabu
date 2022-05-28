import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostRepository } from "src/post/post.repository";
import { PostReactionRepository } from "./post-reaction.repository";
import { PostReactionResolver } from "./resolvers/post-reaction.resolver";
import { PostReactionService } from "./services/post-reaction.service";

@Module({
  providers: [PostReactionService, PostReactionResolver],
  imports: [TypeOrmModule.forFeature([PostReactionRepository, PostRepository])],
  exports: [],
})
export class PostReactionModule {}
