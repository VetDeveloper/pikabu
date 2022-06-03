import { CommentariesEntity } from 'src/commentaries/entities/commentaries.entity';
import { Reaction } from 'src/common/enums/reaction.enum';
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

@Entity()
@Unique(['userId', 'commentaryId'])
export class CommentaryReactionsEntity {
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
  commentaryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.commentaryReactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UsersEntity;

  @ManyToOne(() => CommentariesEntity, (commentary) => commentary.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentaryId' })
  commentary?: CommentariesEntity;
}
