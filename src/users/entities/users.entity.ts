import { Exclude } from 'class-transformer';
import { CommentaryReactionEntity } from 'src/comment-reaction/entities/comment-reaction.entity';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { FavouritesEntity } from 'src/favourites/entities/favourites.entity';
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

  @OneToMany(() => CommentaryEntity, (commentary) => commentary.user)
  commentaries?: CommentaryEntity[];

  @OneToMany(() => CommentaryReactionEntity, (reaction) => reaction.user)
  commentaryReactions?: CommentaryReactionEntity[];

  @OneToMany(() => FavouritesEntity, (fav) => fav.user)
  favourites?: FavouritesEntity[];
}
