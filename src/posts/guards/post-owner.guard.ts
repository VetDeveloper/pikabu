import { Injectable } from '@nestjs/common';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { PostsEntity } from '../entities/posts.entity';

@Injectable()
export class PostOwnerGuard extends OwnerGuard<PostsEntity> {
  constructor() {
    super(PostsEntity);
  }
}
