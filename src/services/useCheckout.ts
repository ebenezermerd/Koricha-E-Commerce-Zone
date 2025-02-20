import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useMemo } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { IAddressItem } from 'src/types/address';

import { CartItem } from 'src/contexts/cart-context';
import { PaymentMethod } from 'types/checkout';

// ----------------------------------------------------------------------

export type CartMappedItem = {
  id: string;
  name: string;
  coverUrl: string;
  available: number;
  price: number;
  colors: string[];
  size: string;
  quantity: number;
};

export type OrderData = {
  items: CartMappedItem[];
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
    amount: number;
    currency: string;
    tx_ref?: string;
    status?: string;
    created_at?: string;
  };
  callback_url?: string;
  return_url?: string;
  status: string;
  discount: number;
  total: number;
  subtotal: number;
};

export type PaymentData = {
  orderId: string;
  paymentMethod: string;
  amount: number;
};

interface UpdateOrderStatusParams {
  orderId: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  txRef?: string;
}

async function createOrder(url: string, { arg }: { arg: OrderData }) {
  const response = await axios.post(url, arg);
  return response.data;
}

async function processPayment(url: string, { arg }: { arg: PaymentData }) {
  const response = await axios.post(url, arg);
  return response.data;
}

const updateOrderStatus = async (params: UpdateOrderStatusParams) => {
  const response = await fetch(`/api/orders/${params.orderId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  return response.json();
};

export function useCheckout() {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    mutate: mutateOrders,
  } = useSWR(endpoints.checkout.orders.list, null);

  const {
    trigger: createOrderTrigger,
    isMutating: isCreatingOrder,
    error: createOrderError,
  } = useSWRMutation(endpoints.checkout.orders.create, createOrder);

  const createNewOrder = async (orderData: OrderData) => {
    try {
      const dataWithCurrency = {
        ...orderData,
        payment: {
          ...orderData.payment,
          currency: 'ETB',
        },
      };
      const result = await createOrderTrigger(dataWithCurrency);
      await mutateOrders();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    orders,
    ordersLoading,
    ordersError,
    createNewOrder,
    isCreatingOrder,
    createOrderError,
  };
} 