import { PostEntity } from "src/post/entities/post.entity";
import { define } from "typeorm-seeding";
import * as Faker from 'faker';

define(PostEntity, (faker: typeof Faker) => {
    const post: PostEntity = new PostEntity()
    const title : string = faker.name.title()
    post.title = title;
    return post;
})