import useSWR from 'swr';
import { useMemo } from 'react';
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';
import { UserType, UpdateUserPayload, UpdatePasswordPayload, transformBackendUser } from 'src/types/user';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Fetch and transform user data
const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return {
      user: transformBackendUser(response.data.user),
      authenticated: true,
    };
  } catch (error) {
    // If the error is 401 or 403, user is not authenticated
    if (error.response?.status === 401 || error.response?.status === 403) {
      return {
        user: null,
        authenticated: false,
      };
    }
    throw error;
  }
};

export function useGetUser() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    endpoints.auth.me,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      user: data?.user || null,
      authenticated: Boolean(data?.authenticated),
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
      revalidateUser: mutate,
    }),
    [data?.user, data?.authenticated, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export async function updateUser(userId: string, updateData: UpdateUserPayload) {
  try {
    const formData = new FormData();

    // Map fields to their backend counterparts
    const fieldMappings: Record<string, string> = {
      gender: 'sex',
      phoneNumber: 'phone', 
      streetAddress: 'address',
      zipCode: 'zip_code'
    };

    // Append all user data to formData with mapped keys
    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else {
          // Use mapped key if it exists, otherwise use original key
          const mappedKey = fieldMappings[key] || key;
          formData.append(mappedKey, String(value));
        }
      }
    });

    const response = await axios.post(`${endpoints.auth.update}/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return transformBackendUser(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
}

export async function updatePassword(userId: string, passwordData: UpdatePasswordPayload) {
  try {
    await axios.post(endpoints.auth.updatePassword, {
      userId,
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
}

// Combined function to update both user data and password
export const updateUserWithPassword = async (
  userId: string | number,
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    birthdate: string | null;
    gender: string;
    streetAddress?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    image?: File;
  },
  passwordData?: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
) => {
  try {
    const updatePromises: Promise<any>[] = [updateUser(userId.toString(), userData)];

    if (passwordData) {
      updatePromises.push(updatePassword(userId.toString(), passwordData));
    }

    await Promise.all(updatePromises);
  } catch (error) {
    throw new Error(error.message || 'Failed to update user information');
  }
} 