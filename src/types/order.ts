export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface IOrderCustomer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  coverUrl: string;
}

export interface IOrderShippingAddress {
  fullAddress: string;
  phoneNumber: string;
}

export interface IOrderPayment {
  id: string;
  method: string;
  status: string;
  amount: number;
  txRef?: string;
}

export interface IOrderDelivery {
  trackingNumber: string;
  status: string;
  deliveredAt?: Date;
}

export interface IOrderHistory {
  status: string;
  timeline: Array<{
    title: string;
    time: string;
    end_time?: string;
  }>;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  customer: IOrderCustomer;
  items: IOrderItem[];
  createdAt: Date;
  totalAmount: number;
  totalQuantity: number;
  shipping: number;
  taxes: number;
  discount: number;
  subtotal: number;
  shippingAddress: IOrderShippingAddress;
  payment: IOrderPayment;
  delivery: IOrderDelivery;
  history: IOrderHistory;
}

export interface IOrderState {
  orders: IOrder[];
  order: IOrder | null;
  sortBy: string | null;
  filters: {
    status: OrderStatus | 'all';
    startDate: Date | null;
    endDate: Date | null;
  };
} 