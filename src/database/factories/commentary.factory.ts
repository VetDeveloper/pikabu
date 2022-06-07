import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { CommentariesEntity } from 'src/commentaries/entities/commentaries.entity';

define(CommentariesEntity, (faker: typeof Faker) => {
  const commentary: CommentariesEntity = new CommentariesEntity();
  const text = faker.lorem.text();
  commentary.text = text;
  return commentary;
});
