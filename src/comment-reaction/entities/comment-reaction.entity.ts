import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { Reaction } from 'src/common/enums/reaction.enum';
import { UserEntity } from 'src/user/entities/user.entity';
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
export class CommentaryReactionEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.commentaryReactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToOne(() => CommentaryEntity, (commentary) => commentary.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentaryId' })
  commentary?: CommentaryEntity;
}
