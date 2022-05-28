import { BadRequestException, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { EntityTarget, getRepository, Repository } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';

export abstract class OwnerGuard<Entity extends { userId: number }>
  implements CanActivate
{
  protected constructor(
    private entity: EntityTarget<Entity>,
    private idParam: string = 'id',
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { user, body } = req;

    if (!user || !body) {
      return false;
    }

    const authUserId: number = user.id;
    const idItem = body.variables[this.idParam];

    if (!idItem) {
      throw new BadRequestException(`Не найден query variable ${this.idParam} для совершения операции`)
    }

    const repo: Repository<Entity> = getRepository(this.entity);

    const item: Entity | undefined = await repo.findOne(idItem);
    console.log("idItem: ", idItem)

    if (!item) {
      throw new NotFoundException()
    }

    return item.userId === authUserId;
  }
}
