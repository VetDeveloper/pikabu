import { Injectable } from "@nestjs/common";
import { OwnerGuard } from "src/common/guards/owner.guard";
import { PostEntity } from "../entities/post.entity";

@Injectable()
export class PostOwnerGuard extends OwnerGuard<PostEntity> {
  constructor() {
    super(PostEntity);
  }
}
