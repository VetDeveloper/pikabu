import { OwnerGuard } from 'src/common/guards/owner.guard';
import { CommentariesEntity } from '../entities/commentaries.entity';

export class CommentaryOwnerGuard extends OwnerGuard<CommentariesEntity> {
  constructor() {
    super(CommentariesEntity);
  }
}
