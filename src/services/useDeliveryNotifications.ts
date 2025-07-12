import axios from 'src/utils/axios';
import { DeliveryStatus } from 'src/types/order';
import { STORAGE_KEY } from 'src/auth/context/jwt/constant';

interface SendNotificationParams {
  orderId: string;
  userId: string;
  type: 'status_update' | 'delivery_confirmation' | 'delivery_reminder';
  status?: DeliveryStatus;
  message?: string;
}

const getAuthHeader = () => {
  const token = sessionStorage.getItem(STORAGE_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export function useDeliveryNotifications() {
  const sendDeliveryStatusUpdate = async ({
    orderId,
    userId,
    status,
    message,
  }: Omit<SendNotificationParams, 'type'>) => {
    return { success: true };
  };

  const sendDeliveryConfirmation = async ({
    orderId,
    userId,
    message,
  }: Omit<SendNotificationParams, 'type' | 'status'>) => {
    return { success: true };
  };

  const sendDeliveryReminder = async ({
    orderId,
    userId,
    message,
  }: Omit<SendNotificationParams, 'type' | 'status'>) => {
    return { success: true };
  };

  return {
    sendDeliveryStatusUpdate,
    sendDeliveryConfirmation,
    sendDeliveryReminder,
  };
}