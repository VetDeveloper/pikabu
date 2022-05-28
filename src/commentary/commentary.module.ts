import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostRepository } from "src/post/post.repository";
import { CommentaryRepository } from "./commentary.repository";
import { CommentaryMutationResolver } from "./resolvers/mutation/commentary-mutation.resolver";
import { CommentaryService } from "./services/commentary.service";

@Module({
    imports: [TypeOrmModule.forFeature([CommentaryRepository,PostRepository])],
    exports: [],
    providers: [CommentaryMutationResolver, CommentaryService]
})
export class CommentaryModule {}