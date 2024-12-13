import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
//
import {
  // E-Commerce
  HomePage,
  EcommerceCartPage,
  EcommerceComparePage,
  EcommerceProductPage,
  EcommerceCheckoutPage,
  EcommerceProductsPage,
  EcommerceWishlistPage,
  EcommerceAccountOrdersPage,
  EcommerceOrderCompletedPage,
  EcommerceAccountPaymentPage,
  EcommerceAccountPersonalPage,
  EcommerceAccountVouchersPage,
  EcommerceAccountWishlistPage,
  // Auth
  LoginCoverPage,
  VerifyCodePage,
  RegisterCoverPage,
  ResetPasswordPage,
  LoginBackgroundPage,
  LoginIllustrationPage,
  RegisterBackgroundPage,
  RegisterIllustrationPage,
  // Common
  Page404,
  Page500,
  PaymentPage,
  SupportPage,
  Pricing01Page,
  Pricing02Page,
  ComingSoonPage,
  MaintenancePage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Non layout
    {
      path: 'auth',
      children: [
        { path: 'login-cover', element: <VerifyCodePage /> },
        { path: 'register-cover', element: <RegisterCoverPage /> },
      ],
    },
    // Main layout
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },

        { path: 'support', element: <SupportPage /> },

        // E-commerce
        {
          path: 'e-commerce',
          children: [
            { path: 'landing', element: <HomePage /> },
            { path: 'products', element: <EcommerceProductsPage /> },
            { path: 'product', element: <EcommerceProductPage /> },
            { path: 'cart', element: <EcommerceCartPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
            { path: 'order-completed', element: <EcommerceOrderCompletedPage /> },
            { path: 'wishlist', element: <EcommerceWishlistPage /> },
            { path: 'compare', element: <EcommerceComparePage /> },
            {
              path: 'account',
              children: [
                { path: 'personal', element: <EcommerceAccountPersonalPage /> },
                { path: 'wishlist', element: <EcommerceAccountWishlistPage /> },
                { path: 'vouchers', element: <EcommerceAccountVouchersPage /> },
                { path: 'orders', element: <EcommerceAccountOrdersPage /> },
                { path: 'payment', element: <EcommerceAccountPaymentPage /> },
              ],
            },
          ],
        },
      ],
    },
    // Simple layout
    {
      element: <SimpleLayout />,
      children: [
        { path: 'payment', element: <PaymentPage /> },
        { path: 'pricing-01', element: <Pricing01Page /> },
        { path: 'pricing-02', element: <Pricing02Page /> },
        {
          path: 'auth',
          children: [
            { path: 'login-background', element: <LoginBackgroundPage /> },
            { path: 'login-illustration', element: <LoginIllustrationPage /> },
            { path: 'register-background', element: <RegisterBackgroundPage /> },
            { path: 'register-illustration', element: <RegisterIllustrationPage /> },
          ],
        },
      ],
    },
    // Compact layout
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: 'reset-code', element: <ResetPasswordPage /> },
        { path: 'verify-code', element: <VerifyCodePage /> },
        {
          path: 'auth',
          children: [
            { path: 'reset-code', element: <ResetPasswordPage /> },
            { path: 'verify-code', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
