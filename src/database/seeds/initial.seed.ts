import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { CommentaryReactionEntity } from 'src/comment-reaction/entities/comment-reaction.entity';
import { PostReactionEntity } from 'src/post-reaction/entities/post-reaction.entity';
import { FavouritesEntity } from 'src/favourites/entities/favourites.entity';
import { EntityType } from 'src/favourites/enums/entity-type.enum';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const usersCount: number = 5;
    const postsCount: number = 10;
    const commentariesCount: number = postsCount;

    const users: UserEntity[] = await factory(UserEntity)()
      .map(async (user) => {
        user.password = await bcrypt.hash(user.password, 5);
        return user;
      })
      .createMany(usersCount);

    const posts: PostEntity[] = await factory(PostEntity)()
      .map(async (post) => {
        post.user = users[Math.floor(Math.random() * users.length)];
        return post;
      })
      .createMany(postsCount);

    const commentaries: CommentaryEntity[] = await factory(CommentaryEntity)()
      .map(async (comment) => {
        comment.user = users[Math.floor(Math.random() * users.length)];
        comment.post = posts[Math.floor(Math.random() * posts.length)];
        return comment;
      })
      .createMany(commentariesCount);

    const commentaryReactions: CommentaryReactionEntity[] = [];
    const postReactions: PostReactionEntity[] = [];
    const favourites: FavouritesEntity[] = [];

    // каждому комменту каждый юзер что-то ставит с вероятностью 60%, посту - 70%, 25% - add to favourites
    for (
      let commentaryAndPostId = 0;
      commentaryAndPostId < commentariesCount;
      commentaryAndPostId++
    ) {
      for (let userId = 0; userId < usersCount; userId++) {
        const randomValue = Math.random();
        if (randomValue < 0.6) {
          commentaryReactions.push(
            await factory(CommentaryReactionEntity)()
              .map(async (comReact) => {
                comReact.user = users[userId];
                comReact.commentary = commentaries[commentaryAndPostId];
                return comReact;
              })
              .create(),
          );
        }
        if (randomValue < 0.7) {
          postReactions.push(
            await factory(PostReactionEntity)()
              .map(async (postReact) => {
                postReact.user = users[userId];
                postReact.post = posts[commentaryAndPostId];
                return postReact;
              })
              .create(),
          );
        }
        if (randomValue < 0.25) {
          const choseEntityType: EntityType =
            Math.random() < 0.5 ? EntityType.COMMENTARY : EntityType.POST
          favourites.push(
            await factory(FavouritesEntity)().map(async (fav) => {
              fav.entityId = commentaryAndPostId;
              fav.entityType = choseEntityType;
              fav.user = users[userId];
              return fav;
            }).create(),
          );
        }
      }
    }
  }
}
