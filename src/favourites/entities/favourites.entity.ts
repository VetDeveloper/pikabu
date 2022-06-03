import { UsersEntity } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityType } from '../enums/entity-type.enum';

@Entity()
export class FavouritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  entityId: number;

  @Column({
    type: 'enum',
    enum: EntityType,
  })
  entityType: EntityType;

  @ManyToOne(() => UsersEntity, (user) => user.favourites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UsersEntity;
}
