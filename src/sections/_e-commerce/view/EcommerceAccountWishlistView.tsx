import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Typography, Button, Stack, Card } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
//
import { EcommerceAccountLayout } from '../layout';
import { EcommerceCartList } from '../cart';
import { useWishlist } from 'src/contexts/wishlist-context';
import { useCart } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

export default function EcommerceAccountWishlistView() {
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
    <EcommerceAccountLayout>
      <Card sx={{ p: 2 }} >
      <Typography variant="h5" sx={{ mb: 1 }}>
        Wishlist
      </Typography>

      {empty ? (
        <EmptyContent
          title="Wishlist is empty!"
          description="Look like you have no items in your wishlist."
          imgUrl="/assets/icons/empty/ic_wishlist.svg"
          sx={{ py: 5 }}
        />
      ) : (
        <>
          <EcommerceCartList wishlist />

          <Stack alignItems={{ sm: 'flex-end' }} sx={{ mt: 3 }}>
            <Stack spacing={3} sx={{ minWidth: 240 }}>
              <Button
                size="large"
                color="inherit"
                variant="contained"
                startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
                onClick={handleAddAllToCart}
              >
                Add All to Cart
              </Button>
            </Stack>
          </Stack>
        </>
      )}
      </Card>
    </EcommerceAccountLayout>
  );
}
