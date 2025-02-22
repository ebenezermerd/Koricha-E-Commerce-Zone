import useSWR from 'swr';
import { useCallback, useMemo } from 'react';
import { API_ENDPOINTS } from 'src/utils/endpoints';
import axios , { endpoints } from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';
import { STORAGE_KEY } from 'src/auth/context/jwt/constant';
import { IOrder } from 'src/types/order';
import { useSWRConfig } from 'swr';
import { mapOrder } from 'src/utils/map-order';

console.log('My Orders endpoint:', endpoints.order.myOrders);

const getAuthHeader = () => {
  const token = sessionStorage.getItem(STORAGE_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export function useOrders() {
  const { user } = useAuthContext();
  const { mutate: globalMutate } = useSWRConfig();

  const ordersEndpoint = useMemo(
    () => (user?.id ? `${endpoints.order.myOrders}` : null),
    [user?.id]
  );

  const {
    data: responseData,
    isLoading,
    error,
    mutate,
  } = useSWR<{ orders: IOrder[]; pagination?: any }>(
    ordersEndpoint,
    async (url: string) => {
      const response = await axios.get(url, getAuthHeader());
      return {
        ...response.data,
        orders: response.data.orders?.map(mapOrder) || []
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const orders = useMemo(() => responseData?.orders || [], [responseData]);
  const pagination = useMemo(() => responseData?.pagination || {}, [responseData]);

  const mutateOrders = useCallback(
    async (data: IOrder[]) => {
      await mutate({ ...responseData, orders: data }, false);
    },
    [mutate, responseData]
  );

  return {
    orders,
    pagination,
    isLoading,
    error,
    mutate: mutateOrders,
  };
} 