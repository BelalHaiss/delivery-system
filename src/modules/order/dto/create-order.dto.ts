import { GeoPoint, Item, OrderType } from 'types/order';

export class CreateOrderDto
  implements
    Pick<
      OrderType,
      'customerName' | 'pickupLocation' | 'deliveryLocation' | 'items'
    >
{
  customerName: string;
  pickupLocation: GeoPoint;
  deliveryLocation: GeoPoint;
  items: Item[];
}
