import { EntityRepository, Repository } from "typeorm";
import { PostReactionEntity } from "./entities/post-reaction.entity";

@EntityRepository(PostReactionEntity)
export class PostReactionRepository extends Repository<PostReactionEntity> {}
