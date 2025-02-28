import { Link as RouterLink } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// components
import { toast } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import { useCart } from 'src/contexts/cart-context';
import { useCheckout } from './context/checkout-context';
import EcommerceCartList from '../cart/EcommerceCartList';
import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { state: cart } = useCart();
  const checkout = useCheckout();
  const {  verifyAddressBeforeCheckout, isAddressComplete  } = checkout;

  const empty = !cart.items.length;

  const total = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleProceedToCheckout = async () => {
    // Verify address completeness before proceeding
    const isComplete = await verifyAddressBeforeCheckout();
    if (isComplete) {
      checkout.onNextStep();
    } else {
      toast.error(
        "Your primary address is incomplete. Please update it in your account settings before proceeding.",
      );
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Typography variant="h6">
              Cart
              <Typography component="span" sx={{ color: 'text.secondary' }}>
                &nbsp;({cart.items.length} item)
              </Typography>

            </Typography>
          }
          sx={{ mb: 3 }}
        />

        {empty ? (
          <EmptyContent
            title="Cart is empty"
            description="Look like you have no items in your shopping cart."
            imgUrl="/assets/icons/empty/ic_cart.svg"
            sx={{ py: 3 }}
          />
        ) : (
          <EcommerceCartList />
        )}
      </Card>

      <Stack direction="row" justifyContent="space-between">
        <Button
          component={RouterLink}
          to={paths.eCommerce.products}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue Shopping
        </Button>

        <Button
          disabled={empty}
          variant="contained"
          onClick={handleProceedToCheckout}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Proceed to Checkout
        </Button>
      </Stack>
    </>
  );
} 