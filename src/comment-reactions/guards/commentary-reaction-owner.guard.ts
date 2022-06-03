import { Injectable } from '@nestjs/common';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { CommentaryReactionsEntity } from '../entities/commentary-reactions.entity';

@Injectable()
export class CommentaryReactionOwnerGuard extends OwnerGuard<CommentaryReactionsEntity> {
  constructor() {
    super(CommentaryReactionsEntity);
  }
}
