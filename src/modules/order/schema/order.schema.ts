import { Schema, model } from 'mongoose';
import { OrderType } from 'types/order';
import { pointSchema, requiredString } from 'util/mongoose.util';

const orderSchema = new Schema<OrderType>({
  carrierName: String,
  customerName: requiredString,
  deliveryLocation: { type: pointSchema, required: true, index: '2dsphere' },
  pickupLocation: { type: pointSchema, required: true },
  status: {
    type: String,
    default: 'init',
    enum: ['init', 'picked', 'ofd', 'delivered', 'canceled'],
  },
});

export const Order = model<OrderType>('Order', orderSchema);
