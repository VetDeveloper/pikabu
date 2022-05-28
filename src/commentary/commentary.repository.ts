import { EntityRepository, Repository } from "typeorm";
import { CommentaryEntity } from "./entities/commentary.entity";

@EntityRepository(CommentaryEntity)
export class CommentaryRepository extends Repository<CommentaryEntity> {}