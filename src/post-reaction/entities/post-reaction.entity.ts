import { PostEntity } from 'src/post/entities/post.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Reaction } from '../../common/enums/reaction.enum';

@Entity()
@Unique(['userId', 'postId'])
export class PostReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Reaction,
  })
  reaction: Reaction;

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

  @ManyToOne(() => UsersEntity, (user) => user.postReactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UsersEntity;

  @ManyToOne(() => PostEntity, (post) => post.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post?: PostEntity;
}
