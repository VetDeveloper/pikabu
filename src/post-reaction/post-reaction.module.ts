import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostRepository } from "src/post/post.repository";
import { PostReactionRepository } from "./post-reaction.repository";
import { PostReactionMutationResolver } from "./resolvers/mutation/mutation-post-reaction.resolver";
import { PostReactionResolver } from "./resolvers/post-reaction.resolver";
import { PostReactionService } from "./services/post-reaction.service";

@Module({
  providers: [PostReactionService, PostReactionResolver, PostReactionMutationResolver],
  imports: [TypeOrmModule.forFeature([PostReactionRepository, PostRepository])],
  exports: [PostReactionService],
})
export class PostReactionModule {}
