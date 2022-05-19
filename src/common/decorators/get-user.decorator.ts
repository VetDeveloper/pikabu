import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    if (context.getType() === 'http') {
        const user = context.switchToHttp().getRequest().user;
      return _data ? user?.[_data] : user;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    return _data ? user?.[_data] : user;
  },
);
