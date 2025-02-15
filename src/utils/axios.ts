import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = paths.auth.jwt.signIn;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    update: '/api/users/update',
    verify: '/api/auth/verify',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
    resetPassword: '/api/auth/reset-password',
    updatePassword: '/api/auth/update-password',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/products/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  checkout: {
    orders: {
      list: '/api/orders/my-orders',
      create: '/api/checkout/orders',
      details: (id: string) => `/api/orders/my-orders/${id}`,
    },
    payments: {
      process: '/api/payments/process',
      verify: (id: string) => `/api/payments/${id}/verify`,
    },
  },
};
