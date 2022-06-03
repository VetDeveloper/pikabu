import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { PostReactionEntity } from 'src/post-reaction/entities/post-reaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
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
import { ImageModel } from '../../common/models/image.model';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({
    type: 'jsonb',
    default: [],
  })
  images: Array<ImageModel>;

  @Column({ type: 'varchar', array: true, default: [] })
  tags: Array<string>;

  @Column({
    type: 'int',
  })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @OneToMany(() => PostReactionEntity, (reaction) => reaction.post)
  reactions?: PostReactionEntity[];

  @OneToMany(() => CommentaryEntity, (commentary) => commentary.post)
  commentaries?: CommentaryEntity[];
}
