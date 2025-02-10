// ----------------------------------------------------------------------
const ROOTS = {
  AUTH: "/auth",
  AUTH_DEMO: "/auth-demo",
  DASHBOARD: "/dashboard",
};

export const paths = {
  // E-commerce
  eCommerce: {
    landing: "/e-commerce/landing",
    products: "/e-commerce/products",
    product: '/e-commerce/product/:id',
    cart: "/e-commerce/cart",
    checkout: `/e-commerce/checkout`,
    orderCompleted: "/e-commerce/order-completed",
    wishlist: `/e-commerce/wishlist`,
    compare: `/e-commerce/compare`,
    account: {
      personal: `/e-commerce/account/personal`,
      wishlist: `/e-commerce/account/wishlist`,
      vouchers: `/e-commerce/account/vouchers`,
      orders: `/e-commerce/account/orders`,
      payment: `/e-commerce/account/payment`,
    },
  },
  // Auth
  auth: {
    login: "/auth/login-cover",
    register: "/auth/register-cover",
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,

      verify: `${ROOTS.AUTH}/jwt/verify`,
      updatePassword: `${ROOTS.AUTH}/jwt/update-password`,
      resetPassword: `${ROOTS.AUTH}/jwt/reset-password`,
    },
  },
  loginCover: "/auth/login-cover",
  loginBackground: "/auth/login-background",
  loginIllustration: "/auth/login-illustration",
  registerCover: "/auth/register-cover",
  registerBackground: "/auth/register-background",
  registerIllustration: "/auth/register-illustration",
  resetPassword: "/auth/reset-password",
  verifyCode: "/auth/verify-code",
  // Common
  maintenance: "/maintenance",
  comingsoon: "/coming-soon",
  pricing01: "/pricing-01",
  pricing02: "/pricing-02",
  payment: "/payment",
  support: "/support",
  page404: "/404",
  page500: "/500",

  // Others
  pages: "/pages",
  docs: "https://zone-docs.vercel.app",
  license: "https://material-ui.com/store/license/#i-standard-license",
  minimalStore: "https://material-ui.com/store/items/minimal-dashboard",
  zoneStore: "https://mui.com/store/items/zone-landing-page/",
  figmaPreview:
    "https://www.figma.com/file/X6OyiGHF8dnTk3aT38P0oN/%5BPreview%5D-Zone_Web.30.03.23?node-id=0-1",
};
