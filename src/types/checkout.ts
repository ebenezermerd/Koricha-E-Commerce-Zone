import { IAddressItem } from './address';
import { CartItem } from 'src/contexts/cart-context';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type PaymentMethod = 'chapa' | 'cash';

export interface IOrder {
  id: string;
  items: CartItem[];
  billing: IAddressItem;
  shipping: {
    address: string;
    method: {
      value: number;
      label: string;
      description: string;
    };
    cost: number;
  };
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
  };
  status: OrderStatus;
  discount: number;
  total: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPayment {
  id: string;
  orderId: string;
  method: string;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
} 