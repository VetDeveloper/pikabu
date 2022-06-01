import { define } from "typeorm-seeding";
import * as Faker from 'faker';
import { CommentaryEntity } from "src/commentary/entities/commentary.entity";

define(CommentaryEntity, (faker: typeof Faker) => {
    const commentary: CommentaryEntity = new CommentaryEntity();
    const text = faker.lorem.text()
    commentary.text = text;
    return commentary;
  });