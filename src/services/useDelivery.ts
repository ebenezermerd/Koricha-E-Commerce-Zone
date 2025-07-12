import useSWR, { useSWRConfig } from 'swr';
import axios from 'src/utils/axios';
import { IOrder, OrderStatus, DeliveryStatus } from 'src/types/order';
import { useDeliveryNotifications } from './useDeliveryNotifications';
import { useAuthContext } from 'src/auth/hooks';
import { STORAGE_KEY } from 'src/auth/context/jwt/constant';

const getAuthHeader = () => {
  const token = sessionStorage.getItem(STORAGE_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

type MutateFunction = (
  key: string,
  data: (currentData: IOrder | null) => Promise<IOrder | null> | IOrder | null,
  shouldRevalidate?: boolean
) => Promise<IOrder | null>;

export function useDelivery() {
  const { mutate: globalMutate } = useSWRConfig();
  const { user } = useAuthContext();
  const { sendDeliveryStatusUpdate, sendDeliveryConfirmation } = useDeliveryNotifications();

  const confirmDelivery = async (orderId: string) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}/delivery-status`, {
        status: 'completed'
      }, getAuthHeader());
      
      // Invalidate and refetch orders
      await globalMutate('/api/orders/my-orders');
      
      // Update the specific order cache
      const updatedOrder = await (globalMutate as MutateFunction)(
        `/api/orders/${orderId}`,
        async (currentOrder) => {
          if (!currentOrder) return null;
          return {
            ...currentOrder,
            status: 'delivered_confirmed' as OrderStatus,
            delivery: {
              ...currentOrder.delivery,
              status: 'delivered' as DeliveryStatus,
              confirmedAt: new Date(),
              confirmedBy: {
                user: user?.id,
              },
            },
          };
        },
        false
      );

      // Send delivery confirmation notification
      if (user?.id) {
        await sendDeliveryConfirmation({
          orderId,
          userId: user.id,
          message: 'Thank you for confirming your delivery!',
        });
      }

      return response.data;
    } catch (error) {
      console.error('Error confirming delivery:', error);
      throw error;
    }
  };

  const updateDeliveryStatus = async ({
    orderId,
    status,
    notes,
    estimatedDeliveryDate,
  }: {
    orderId: string;
    status: DeliveryStatus;
    notes?: string;
    estimatedDeliveryDate?: Date;
  }) => {
    try {
      const response = await axios.patch(
        `/api/orders/${orderId}/delivery-status`,
        {
          status,
          notes,
          estimatedDeliveryDate,
        },
        getAuthHeader()
      );

      // Invalidate and refetch orders
      await globalMutate('/api/orders/my-orders');
      
      // Update the specific order cache
      const updatedOrder = await (globalMutate as MutateFunction)(
        `/api/orders/${orderId}`,
        async (currentOrder) => {
          if (!currentOrder) return null;
          return {
            ...currentOrder,
            delivery: {
              ...currentOrder.delivery,
              status,
              notes,
              estimatedDeliveryDate,
            },
          };
        },
        false
      );

      // Send status update notification
      if (updatedOrder && updatedOrder.customer) {
        await sendDeliveryStatusUpdate({
          orderId,
          userId: updatedOrder.customer.id,
          status,
          message: `Your order delivery status has been updated to ${status.replace(/_/g, ' ')}.`,
        });
      }

      return response.data;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      throw error;
    }
  };

  return {
    confirmDelivery,
    updateDeliveryStatus,
  };
} 