import { Injectable } from '@nestjs/common';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { PostReactionEntity } from '../entities/post-reaction.entity';

@Injectable()
export class PostReactionOwnerGuard extends OwnerGuard<PostReactionEntity> {
  constructor() {
    super(PostReactionEntity);
  }
}
