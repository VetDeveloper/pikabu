import { CommentaryEntity } from 'src/commentary/entities/commentary.entity';
import { PostReactionsEntity } from 'src/post-reactions/entities/post-reactions.entity';
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
import { ImageModel } from '../../common/models/image.model';

@Entity()
export class PostsEntity {
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

  @ManyToOne(() => UsersEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UsersEntity;

  @OneToMany(() => PostReactionsEntity, (reaction) => reaction.post)
  reactions?: PostReactionsEntity[];

  @OneToMany(() => CommentaryEntity, (commentary) => commentary.post)
  commentaries?: CommentaryEntity[];
}
