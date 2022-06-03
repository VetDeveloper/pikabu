import { Exclude } from 'class-transformer';
import { CommentaryReactionsEntity } from 'src/comment-reactions/entities/commentary-reactions.entity';
import { CommentariesEntity } from 'src/commentaries/entities/commentaries.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { PostReactionsEntity } from 'src/post-reactions/entities/post-reactions.entity';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UsersEntity {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 5);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 35,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PostsEntity, (post) => post.user)
  posts?: PostsEntity[];

  @OneToMany(() => PostReactionsEntity, (reaction) => reaction.user)
  postReactions?: PostReactionsEntity[];

  @OneToMany(() => CommentariesEntity, (commentary) => commentary.user)
  commentaries?: CommentariesEntity[];

  @OneToMany(() => CommentaryReactionsEntity, (reaction) => reaction.user)
  commentaryReactions?: CommentaryReactionsEntity[];

  @OneToMany(() => FavoritesEntity, (fav) => fav.user)
  favourites?: FavoritesEntity[];
}
