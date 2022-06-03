import { StringValueNode } from 'graphql';
import { CommentaryReactionsEntity } from 'src/comment-reactions/entities/commentary-reactions.entity';
import { ImageModel } from 'src/common/models/image.model';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CommentariesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  text: string | null;

  @Column({
    type: 'jsonb',
    default: [],
  })
  images: Array<ImageModel>;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  postId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.commentaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UsersEntity;

  @ManyToOne(() => PostsEntity, (post) => post.commentaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post?: PostsEntity;

  @OneToMany(() => CommentaryReactionsEntity, (reaction) => reaction.commentary)
  reactions?: CommentaryReactionsEntity[];
}
