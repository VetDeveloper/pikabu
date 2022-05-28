import { OwnerGuard } from "src/common/guards/owner.guard";
import { CommentaryEntity } from "../entities/commentary.entity";

export class CommentaryOwnerGuard extends OwnerGuard<CommentaryEntity> {
    constructor() {
      super(CommentaryEntity);
    }
  }