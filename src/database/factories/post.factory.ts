import { PostsEntity } from 'src/posts/entities/posts.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(PostsEntity, (faker: typeof Faker) => {
  const post: PostsEntity = new PostsEntity();
  const title: string = faker.name.title();
  post.title = title;
  return post;
});
