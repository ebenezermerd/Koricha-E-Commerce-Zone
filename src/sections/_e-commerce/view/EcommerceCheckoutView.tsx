import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// auth
import { useAuthContext } from 'src/auth/hooks/use-auth-context';
// components
import { CheckoutProvider, useCheckout } from '../checkout/context/checkout-context';
import CheckoutCart from '../checkout/checkout-cart';
import CheckoutBillingAddress from '../checkout/checkout-billing-address';
import CheckoutPayment from '../checkout/checkout-payment';
import { useCart } from 'src/contexts/cart-context';
import CheckoutSuccess from '../checkout/checkout-success';
import CheckoutStepper from '../checkout/checkout-stepper';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutView() {
  const navigate = useNavigate();
  const { authenticated } = useAuthContext();
  const { state: cart } = useCart();

  const empty = !cart.items.length;

  useEffect(() => {
    if (!authenticated) {
      // Redirect to sign in with return URL set to checkout
      const returnTo = paths.eCommerce.checkout;
      navigate(`${paths.auth.jwt.signIn}?returnTo=${encodeURIComponent(returnTo)}`);
      return;
    }

    // If cart is empty, redirect to products page
    if (empty) {
      navigate(paths.eCommerce.products);
    }
  }, [authenticated, empty, navigate]);

  // Show nothing while checking authentication or if cart is empty
  if (!authenticated || empty) {
    return null;
  }

  return (
    <CheckoutProvider>
      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Checkout
        </Typography>

        <CheckoutStepper />
        <CheckoutSteps />
      </Container>
    </CheckoutProvider>
  );
}

// ----------------------------------------------------------------------

function CheckoutSteps() {
  const { activeStep } = useCheckout();

  return (
    <>
      {activeStep === 0 && <CheckoutCart />}

      {activeStep === 1 && <CheckoutBillingAddress />}

      {activeStep === 2 && <CheckoutPayment />}

      {activeStep === 3 && <CheckoutSuccess />}
    </>
  );
}
