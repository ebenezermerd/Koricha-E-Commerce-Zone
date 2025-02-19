import useSWR from 'swr';
import { useMemo } from 'react';
import { endpoints } from 'src/utils/axios';
import { IOrder } from 'src/types/order';
import axios from 'src/utils/axios';

console.log('My Orders endpoint:', endpoints.order.myOrders);

export function useOrders() {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    mutate: mutateOrders,
  } = useSWR(endpoints.order.list);

  const {
    data: myOrdersData,
    isLoading: myOrdersLoading,
    error: myOrdersError,
    mutate: mutateMyOrders
  } = useSWR(endpoints.order.myOrders, {
    onSuccess: (data) => {
      console.log('My Orders response:', {
        data,
        endpoint: endpoints.order.myOrders,
        hasOrders: data?.orders?.length > 0
      });
    },
    onError: (error) => {
      console.error('My Orders error:', {
        error,
        message: error.message,
        endpoint: endpoints.order.myOrders,
        status: error.response?.status,
        responseData: error.response?.data
      });
    }
  });

  const ordersList = useMemo(
    () => (orders?.orders as IOrder[]) || [],
    [orders]
  );

  const myOrdersList = useMemo(
    () => {
      console.log('Processing myOrdersData:', myOrdersData);
      const orders = (myOrdersData?.orders as IOrder[]) || [];
      console.log('Processed orders:', orders);
      return orders;
    },
    [myOrdersData]
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
    myOrdersLoading,
    myOrdersError,
    getOrder,
    updateOrderStatus,
    mutateOrders,
    mutateMyOrders,
  };
} 