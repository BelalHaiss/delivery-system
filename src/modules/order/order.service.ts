import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schema/order.schema';
import { CoordinatesQuery, OrderType } from 'types/order';

@Injectable()
export class OrderService {
  async create(createOrderDto: CreateOrderDto) {
    return Order.create(createOrderDto);
  }

  async findAll() {
    return Order.find().sort({ _id: -1 }).limit(100);
  }

  async findOne(id: string) {
    return Order.findById(id);
  }

  async updateStatus(id: string, status: OrderType['status']) {
    return Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async assign_order_to_carrier(orderId: string, carrierName: string) {
    return Order.findByIdAndUpdate(
      orderId,
      {
        carrierName,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async nearstOrder(query: CoordinatesQuery) {
    const { longitude, latitude } = query;
    return Order.findOne({
      deliveryLocation: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [+longitude, +latitude],
          },
        },
      },
      status: 'ofd', // the carrier normally update the order status after picking the item
    });
  }

  async maximizeOrderCapacity() {
    const assumption = `
     this assumption can have lots of possibilities but i will write the simple one
     1- get coordinates of start point can be (warehouse-shop-...etc)
     2 - gets carriers counts && maxOrders per carrier
     3-  sort nearst order =>  order.find with  $nearSphere query with the coordinates of the start point
     4- loop within sortedOrder and assign each carrier with the max orders he can have
    `;

    return assumption;
  }

  remove(id: string) {
    return Order.findByIdAndDelete(id);
  }
}
