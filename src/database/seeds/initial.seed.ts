import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcryptjs';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { CommentariesEntity } from 'src/commentaries/entities/commentaries.entity';
import { CommentaryReactionsEntity } from 'src/comment-reactions/entities/commentary-reactions.entity';
import { PostReactionsEntity } from 'src/comment-reactions/entities/post-reactions.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { EntityType } from 'src/favorites/enums/entity-type.enum';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const usersCount: number = 5;
    const postsCount: number = 10;
    const commentariesCount: number = postsCount;

    const users: UsersEntity[] = await factory(UsersEntity)().createMany(
      usersCount,
    );

    const posts: PostsEntity[] = await factory(PostsEntity)()
      .map(async (post) => {
        post.user = users[Math.floor(Math.random() * users.length)];
        return post;
      })
      .createMany(postsCount);

    const commentaries: CommentariesEntity[] = await factory(
      CommentariesEntity,
    )()
      .map(async (comment) => {
        comment.user = users[Math.floor(Math.random() * users.length)];
        comment.post = posts[Math.floor(Math.random() * posts.length)];
        return comment;
      })
      .createMany(commentariesCount);

    const commentaryReactions: CommentaryReactionsEntity[] = [];
    const postReactions: PostReactionsEntity[] = [];
    const favourites: FavoritesEntity[] = [];

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
            await factory(CommentaryReactionsEntity)()
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
            await factory(PostReactionsEntity)()
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
            Math.random() < 0.5 ? EntityType.COMMENTARY : EntityType.POST;
          favourites.push(
            await factory(FavoritesEntity)()
              .map(async (fav) => {
                fav.entityId = commentaryAndPostId;
                fav.entityType = choseEntityType;
                fav.user = users[userId];
                return fav;
              })
              .create(),
          );
        }
      }
    }
  }
}
