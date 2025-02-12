import { Suspense, lazy, ElementType } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------



// E-COMMERCE
export const EcommerceCartPage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceCartPage"))
);
export const EcommerceCheckoutPage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceCheckoutPage"))
);
export const EcommerceComparePage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceComparePage"))
);
export const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
export const EcommerceOrderCompletedPage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceOrderCompletedPage"))
);
export const EcommerceProductPage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceProductPage"))
);
export const EcommerceProductsPage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceProductsPage"))
);
export const EcommerceWishlistPage = Loadable(
  lazy(() => import("../pages/e-commerce/EcommerceWishlistPage"))
);
export const EcommerceAccountOrdersPage = Loadable(
  lazy(() => import("../pages/e-commerce/account/EcommerceAccountOrdersPage"))
);
export const EcommerceAccountAddressPage = Loadable(
  lazy(() => import("../pages/e-commerce/account/EcommerceAccountAddressPage"))
);
export const EcommerceAccountPersonalPage = Loadable(
  lazy(() => import("../pages/e-commerce/account/EcommerceAccountPersonalPage"))
);
export const EcommerceAccountVouchersPage = Loadable(
  lazy(() => import("../pages/e-commerce/account/EcommerceAccountVouchersPage"))
);
export const EcommerceAccountWishlistPage = Loadable(
  lazy(() => import("../pages/e-commerce/account/EcommerceAccountWishlistPage"))
);




// AUTH
export const LoginBackgroundPage = Loadable(
  lazy(() => import("../pages/auth/LoginBackgroundPage"))
);
export const LoginCoverPage = Loadable(
  lazy(() => import("../pages/auth/LoginCoverPage"))
);
export const LoginIllustrationPage = Loadable(
  lazy(() => import("../pages/auth/LoginIllustrationPage"))
);
export const RegisterBackgroundPage = Loadable(
  lazy(() => import("../pages/auth/RegisterBackgroundPage"))
);
export const RegisterCoverPage = Loadable(
  lazy(() => import("../pages/auth/RegisterCoverPage"))
);
export const RegisterIllustrationPage = Loadable(
  lazy(() => import("../pages/auth/RegisterIllustrationPage"))
);
export const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPasswordPage"))
);
export const VerifyCodePage = Loadable(
  lazy(() => import("../pages/auth/VerifyCodePage"))
);
export const SignInPage = Loadable(
  lazy(() => import('src/pages/auth/jwt/sign-in'))
);
export const SignUpPage = Loadable(
  lazy(() => import('src/pages/auth/jwt/sign-up'))
);
export const VerifyPage = Loadable(
  lazy(() => import('src/pages/auth/jwt/verify'))
);
export const UpdatePasswordPage = Loadable(
  lazy(() => import('src/pages/auth/jwt/update-password'))
);
export const JwtResetPasswordPage = Loadable(
  lazy(() => import('src/pages/auth/jwt/reset-password'))
);


// COMMON
export const ComingSoonPage = Loadable(
  lazy(() => import("../pages/ComingSoonPage"))
);
export const MaintenancePage = Loadable(
  lazy(() => import("../pages/MaintenancePage"))
);
export const Page404 = Loadable(lazy(() => import("../pages/Page404")));
export const Page500 = Loadable(lazy(() => import("../pages/Page500")));
export const PaymentPage = Loadable(lazy(() => import("../pages/PaymentPage")));
export const Pricing01Page = Loadable(
  lazy(() => import("../pages/Pricing01Page"))
);
export const Pricing02Page = Loadable(
  lazy(() => import("../pages/Pricing02Page"))
);
export const SupportPage = Loadable(lazy(() => import("../pages/SupportPage")));

// ----------------------------------------------------------------------
