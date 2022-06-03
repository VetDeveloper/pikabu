import { registerEnumType } from '@nestjs/graphql';

export enum SortVariant {
  CREATEDAT = 'createdAt',
  LIKES = 'likes',
}

registerEnumType(SortVariant, {
  name: 'Sort',
});
