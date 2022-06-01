import { UserEntity } from "src/user/entities/user.entity";
import { define } from "typeorm-seeding";
import * as Faker from 'faker';

define(UserEntity, (faker: typeof Faker) => {
    const user: UserEntity = new UserEntity();
    const email = faker.internet.email();
    const password = 'testtest';
    user.email = email;
    user.password = password;
    return user;
  });