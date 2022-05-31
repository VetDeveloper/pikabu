import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
