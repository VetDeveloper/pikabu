import { Injectable } from '@nestjs/common';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { CommentaryReactionEntity } from '../entities/comment-reaction.entity';

@Injectable()
export class CommentaryReactionOwnerGuard extends OwnerGuard<CommentaryReactionEntity> {
  constructor() {
    super(CommentaryReactionEntity);
  }
}