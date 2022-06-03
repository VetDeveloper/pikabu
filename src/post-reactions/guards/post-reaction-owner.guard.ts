import { Injectable } from '@nestjs/common';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { PostReactionsEntity } from '../entities/post-reactions.entity';

@Injectable()
export class PostReactionOwnerGuard extends OwnerGuard<PostReactionsEntity> {
  constructor() {
    super(PostReactionsEntity);
  }
}
