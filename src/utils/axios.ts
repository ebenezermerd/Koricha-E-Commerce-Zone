import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

// Add request interceptor to log requests
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Received response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    if (error.response?.status === 401) {
      // Get current path for return URL
      const currentPath = window.location.pathname;
      const returnTo = encodeURIComponent(currentPath);
      
      // Redirect to sign in with return URL
      window.location.href = `${paths.auth.jwt.signIn}?returnTo=${returnTo}`;
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
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    checkResetToken: (token: string) => `/api/auth/reset-password/${token}`,

    updatePassword: '/api/auth/update-password',

    
    emailVerify: '/api/auth/email/verify',
    emailVerifyResend: '/api/auth/email/verify/resend',
    emailSendOtp: '/api/auth/email/send-otp',
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
  testimonials: {
    list: '/api/testimonials/list',
    details: '/api/testimonials/details',
    featured: '/api/testimonials/featured',
    create: '/api/testimonials/create',
    update: '/api/testimonials/update',
  },
  reviews: {
    list: '/api/reviews',
    create: '/api/reviews',
    update: (id: string) => `/api/reviews/${id}`,
    helpful: (id: string) => `/api/reviews/${id}/helpful`,
  },
  order: {
    list: '/api/orders/list',
    myOrders: '/api/orders/user',
    details: (id: string) => `/api/orders/${id}`,
    update: (id: string) => `/api/orders/${id}`,
  },
  address: {
    list: '/api/addresses',
    create: '/api/addresses',
    update: (id: string) => `/api/addresses/${id}`,
    delete: (id: string) => `/api/addresses/${id}`,
  },
  support: {
    inquiries: {
      create: '/api/support/inquiries',
    },
  },
};  

