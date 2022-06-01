import { Exclude } from 'class-transformer';
import { CommentaryReactionEntity } from 'src/comment-reaction/entities/comment-reaction.entity';
import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { FavouritesEntity } from 'src/favourites/entities/favourites.entity';
import { PostReactionEntity } from 'src/post-reaction/entities/post-reaction.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
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

  @OneToMany(() => PostEntity, (post) => post.user)
  posts?: PostEntity[];

  @OneToMany(() => PostReactionEntity, (reaction) => reaction.user)
  postReactions?: PostReactionEntity[];

  @OneToMany(() => CommentaryEntity, (commentary) => commentary.user)
  commentaries?: CommentaryEntity[];

  @OneToMany(() => CommentaryReactionEntity, (reaction) => reaction.user)
  commentaryReactions?: CommentaryReactionEntity[];

  @OneToMany(()=> FavouritesEntity, (fav) => fav.user )
  favourites?: FavouritesEntity[];
}
