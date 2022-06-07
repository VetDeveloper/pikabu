import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostModel } from 'src/posts/models/post.model';

@ObjectType({ isAbstract: true })
  abstract class MetaType {
    @Field(() => Int)
    totalItems: number;
    @Field(() => Int)
    itemCount: number;
    @Field(() => Int)
    itemsPerPage: number;
    @Field(() => Int)
    totalPages: number;
    @Field(() => Int)
    currentPage: number;
  }

  @ObjectType({ isAbstract: true })
  abstract class LinksType {
    @Field()
    first: string;
    @Field()
    previous: string;
    @Field()
    next: string;
    @Field()
    last: string;
  }

export function Paginated<T>(classRef: Type<T>): any {

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: typeof classRef[];
    @Field(() => MetaType)
    meta: MetaType;
    @Field(() => LinksType)
    links: LinksType;
  }

  return PaginatedType;
}
