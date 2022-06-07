import { UsersEntity } from 'src/users/entities/users.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(UsersEntity, (faker: typeof Faker) => {
  const user: UsersEntity = new UsersEntity();
  const email = faker.internet.email();
  const password = 'testtest';
  user.email = email;
  user.password = password;
  return user;
});
