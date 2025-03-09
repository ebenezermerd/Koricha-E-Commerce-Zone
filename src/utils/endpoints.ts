export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  user: '/api/user',
  products: '/products',
  categories: '/categories',
  cart: '/cart',
  orders: '/orders',
  checkout: {
    pendingPayments: '/api/orders/pending-chapa-payments',
    resumePayment: '/api/chapa/resume-payment',
  },
  // Add other endpoints as needed
} as const;

// Helper function to build user-specific address endpoints
export const getUserAddressEndpoints = (userId: string) => ({
  list: `${API_ENDPOINTS.user}/${userId}/addresses`,
  create: `${API_ENDPOINTS.user}/${userId}/addresses`,
  update: (addressId: string) => `${API_ENDPOINTS.user}/${userId}/addresses/${addressId}`,
  delete: (addressId: string) => `${API_ENDPOINTS.user}/${userId}/addresses/${addressId}`,
}); 