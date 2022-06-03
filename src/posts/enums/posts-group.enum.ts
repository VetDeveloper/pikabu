import { registerEnumType } from '@nestjs/graphql';

export enum PostsGroup {
  FRESH = 'fresh',
  HOT = 'hot',
  BEST = 'best',
}

registerEnumType(PostsGroup, {
  name: 'Group',
});
