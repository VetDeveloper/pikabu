import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostReactionRepository } from "./post-reaction.repository";

@Module({
  providers: [],
  imports: [TypeOrmModule.forFeature([PostReactionRepository])],
  exports: [],
})
export class PostReactionModule {}
