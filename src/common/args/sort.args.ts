import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { Order } from '../enums/order.enum';
import { Sort } from '../enums/sort.enum';

@ArgsType()
export class SortArgs {
  @Field(()=> Sort ,{ defaultValue: Sort.CREATEDAT })
  @IsOptional()
  @IsEnum(Sort)
  sort: Sort;

  @Field(() => Order, { defaultValue: Order.DESC })
  @IsOptional()
  @IsEnum(Order)
  order: Order
}
