import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import { useCallback } from 'react';
// utils
import { API_ENDPOINTS } from 'src/utils/endpoints';
import axios from 'src/utils/axios';
// types
import { IAddressItem } from 'src/types/address';
import { useAuthContext } from 'src/auth/hooks';
import { STORAGE_KEY } from 'src/auth/context/jwt/constant';

// ----------------------------------------------------------------------

// Helper to get auth header
const getAuthHeader = () => {
  const token = sessionStorage.getItem(STORAGE_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export function useGetAddresses() {
  const { user } = useAuthContext();
  const { mutate: globalMutate } = useSWRConfig();



  const {
    data: addresses = [],
    isLoading,
    error,
    mutate,
  } = useSWR(
    user?.id ? `${API_ENDPOINTS.user}/${user.id}/addresses` : null,
    async (url) => {
      const response = await axios.get(url, getAuthHeader());
      return response.data;
    }
  );

  const mutateAddresses = useCallback(
    async (data: IAddressItem[]) => {
      await mutate(data, {
        revalidate: true,
      });
      await globalMutate(
        (key) => typeof key === 'string' && key.startsWith(`${API_ENDPOINTS.user}`),
        undefined,
        { revalidate: true }
      );
    },
    [mutate, globalMutate]
  );

  return {
    addresses,
    isLoading,
    error,
    mutate: mutateAddresses,
  };
}

export function useAddAddress() {
  const { user } = useAuthContext();
  const { mutate } = useSWRConfig();

  const addAddress = useCallback(
    async (address: Omit<IAddressItem, 'id'>) => {
      try {
        const response = await axios.post(
          `${API_ENDPOINTS.user}/${user?.id}/addresses/create`,
          address,
          getAuthHeader()
        );
        
        await mutate(
          (key) => typeof key === 'string' && key.startsWith(`${API_ENDPOINTS.user}`),
          undefined,
          { revalidate: true }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [user?.id, mutate]
  );

  return { addAddress };
}

export function useUpdateAddress() {
  const { user } = useAuthContext();
  const { mutate } = useSWRConfig();

  const updateAddress = useCallback(
    async (addressId: string, address: IAddressItem) => {
      try {
        const response = await axios.put(
          `${API_ENDPOINTS.user}/${user?.id}/addresses/${addressId}`,
          address,
          getAuthHeader()
        );

        await mutate(
          (key) => typeof key === 'string' && key.startsWith(`${API_ENDPOINTS.user}`),
          undefined,
          { revalidate: true }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [user?.id, mutate]
  );

  return { updateAddress };
}

export function useDeleteAddress() {
  const { user } = useAuthContext();
  const { mutate } = useSWRConfig();

  const deleteAddress = useCallback(
    async (addressId: string) => {
      try {
        await axios.delete(
          `${API_ENDPOINTS.user}/${user?.id}/addresses/${addressId}`,
          getAuthHeader()
        );

        await mutate(
          (key) => typeof key === 'string' && key.startsWith(`${API_ENDPOINTS.user}`),
          undefined,
          { revalidate: true }
        );
      } catch (error) {
        throw error;
      }
    },
    [user?.id, mutate]
  );

  return { deleteAddress };
} 