import useSWR from 'swr';
import axios from 'src/utils/axios';
import useSWRMutation  from 'swr/mutation';
import { API_ENDPOINTS } from 'src/utils/endpoints';
import { STORAGE_KEY } from 'src/auth/context/jwt/constant';

export type PendingPayment = {
  order_id: string;
  order_number: string;
  amount: number;
  created_at: string;
  tx_ref: string;
  items_count: number;
};

const getAuthHeader = () => {
    const token = sessionStorage.getItem(STORAGE_KEY);
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

async function resumePayment(url: string, { arg }: { arg: { tx_ref: string } }) {
  const response = await axios.post(url, arg);
  return response.data;
}

export function usePendingPayments() {
  const {
    data: pendingPayments,
    isLoading,
    error,
    mutate,
  } = useSWR<{ status: string; pending_payments: PendingPayment[] }>(
    API_ENDPOINTS.checkout.pendingPayments,
    async (url: string) => {
      const response = await axios.get(url, getAuthHeader());
      return response.data;
    }
  );

  const {
    trigger: resumePaymentTrigger,
    isMutating: isResuming,
    error: resumeError,
  } = useSWRMutation(API_ENDPOINTS.checkout.resumePayment, resumePayment);

  const resumePendingPayment = async (tx_ref: string) => {
    try {
      const result = await resumePaymentTrigger({ tx_ref });
      await mutate();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    pendingPayments: pendingPayments?.pending_payments || [],
    isLoading,
    error,
    resumePendingPayment,
    isResuming,
    resumeError,
  };
} 