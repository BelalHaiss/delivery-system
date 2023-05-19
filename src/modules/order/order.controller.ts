import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CoordinatesQuery, OrderType } from 'types/order';

@Controller('order')
// @authGuard
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  // @clientGuard
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('capacity')
  getMaxCapacity() {
    return this.orderService.maximizeOrderCapacity();
  }
  @Get('youDeliverThis')
  // @userGuard
  getNearstOrder(@Query() query: CoordinatesQuery) {
    console.log({ query });
    return this.orderService.nearstOrder(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
  @Get()
  // @userGuard
  findAll() {
    return this.orderService.findAll();
  }

  @Patch('assign/:id')
  // @userGuard
  assignOrder(@Param('id') id: string, @Body() data: { carrierName: string }) {
    return this.orderService.assign_order_to_carrier(id, data.carrierName);
  }
  @Patch('status/:id')
  // @userGuard
  update(
    @Param('id') id: string,
    @Body() data: { status: OrderType['status'] },
  ) {
    return this.orderService.updateStatus(id, data.status);
  }

  @Delete(':id')
  // @anyAuthGuard(user|client)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
