import useSWR from 'swr';
import { useMemo } from 'react';
import { endpoints } from 'src/utils/axios';
import { IOrder } from 'src/types/order';
import axios from 'src/utils/axios';

export function useOrders() {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    mutate: mutateOrders,
  } = useSWR(endpoints.order.list);

  const myOrders = useSWR(endpoints.order.myOrders);

  const ordersList = useMemo(
    () => (orders?.orders as IOrder[]) || [],
    [orders]
  );

  const myOrdersList = useMemo(
    () => (myOrders?.data?.orders as IOrder[]) || [],
    [myOrders.data]
  );

  const getOrder = async (id: string) => {
    try {
      const response = await axios.get(endpoints.order.details(id));
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const response = await axios.put(endpoints.order.update(id), { status });
      await mutateOrders();
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  return {
    orders: ordersList,
    myOrders: myOrdersList,
    ordersLoading,
    ordersError,
    getOrder,
    updateOrderStatus,
    mutateOrders,
  };
} 