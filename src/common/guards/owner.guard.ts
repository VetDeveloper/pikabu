import { CanActivate, ExecutionContext } from '@nestjs/common';
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

    const repo: Repository<Entity> = getRepository(this.entity);

    const item: Entity | undefined = await repo.findOne(idItem);

    if (!item) {
      return false;
    }

    return item.userId === authUserId;
  }

  private getItemId(req: any): number {
    const { body } = req;
    return body.variables[this.idParam];
  }
}
