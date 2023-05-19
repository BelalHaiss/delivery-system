export interface OrderType {
  customerName: string;
  pickupLocation: GeoPoint;
  deliveryLocation: GeoPoint;
  items: Item[];
  carrierName: string;
  status: OrderStatus;
}

type GeoPoint = {
  type: 'Point';
  coordinates: [number, number];
};

type Item = {
  name: string;
  unitPrice: number;
  qty: number;
};

type OrderStatus = 'init' | 'picked' | 'ofd' | 'delivered' | 'canceled';

export type CoordinatesQuery = {
  longitude: string;
  latitude: string;
};
