import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { Order } from '../enums/order.enum';
import { SortVariant } from '../enums/sort-variant.enum';

@ArgsType()
export class SortArgs {
  @Field(() => SortVariant, { defaultValue: SortVariant.CREATEDAT })
  @IsOptional()
  @IsEnum(SortVariant)
  sort: SortVariant;

  @Field(() => Order, { defaultValue: Order.DESC })
  @IsOptional()
  @IsEnum(Order)
  order: Order;
}
