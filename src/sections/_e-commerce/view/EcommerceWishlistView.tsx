import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Container, Typography, Button, Stack, Card, CardHeader } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
//
import { EcommerceHeader } from '../layout';
import { EcommerceCartList } from '../cart';
import { useWishlist } from 'src/contexts/wishlist-context';
import { useCart } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

export default function EcommerceWishlistView() {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const empty = !wishlistState.items.length;

  const handleAddAllToCart = () => {
    wishlistState.items.forEach((item) => {
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          product: item.product,
          quantity: 1,
          colors: [],
          size: '',
        },
      });
      wishlistDispatch({
        type: 'MOVE_TO_CART',
        payload: { productId: item.product.id },
      });
    });
  };

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
          Wishlist
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Wishlist
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({wishlistState.items.length} items)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {empty ? (
            <EmptyContent
              title="Wishlist is empty!"
              description="Look like you have no items in your wishlist."
              imgUrl="/assets/icons/empty/ic_wishlist.svg"
              sx={{ pt: 5, pb: 10 }}
            />
          ) : (
            <EcommerceCartList wishlist />
          )}
        </Card>

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent={{ sm: 'space-between' }}
          sx={{ mt: 3 }}
        >
          <Button
            component={RouterLink}
            to={paths.eCommerce.products}
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
          >
            Continue Shopping
          </Button>

          {!empty && (
            <Button
              size="large"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
              onClick={handleAddAllToCart}
            >
              Add All to Cart
            </Button>
          )}
        </Stack>
      </Container>
    </>
  );
}
