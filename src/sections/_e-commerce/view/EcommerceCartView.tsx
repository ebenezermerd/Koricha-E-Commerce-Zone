import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Button, Unstable_Grid2 as Grid } from '@mui/material';
import { Card, CardHeader } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// config
import { CONFIG } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
//
import { EcommerceHeader } from '../layout';
import { EcommerceCartList, EcommerceCartSummary } from '../cart';
import { useCart } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

export default function EcommerceCartView() {
  const { state } = useCart();
  const empty = !state.items.length;

  return (
    <>
      <EcommerceHeader />

      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Cart
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({state.items.reduce((total, item) => total + item.quantity, 0)} items)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {empty ? (
                <EmptyContent
                  title="Cart is empty!"
                  description="Look like you have no items in your shopping cart."
                  imgUrl="/assets/icons/empty/ic_cart.svg"
                  sx={{ pt: 5, pb: 10 }}
                />
              ) : (
                <EcommerceCartList />
              )}
            </Card>

            <Button
              component={RouterLink}
              to={paths.eCommerce.products}
              color="inherit"
              startIcon={<Iconify icon="carbon:chevron-left" />}
            >
              Continue Shopping
            </Button>
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCartSummary
              tax={state.tax}
              total={state.total}
              subtotal={state.subtotal}
              shipping={state.shipping}
              discount={state.discount}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={empty}
              component={RouterLink}
              to={paths.eCommerce.checkout}
              sx={{ mt: 3 }}
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
