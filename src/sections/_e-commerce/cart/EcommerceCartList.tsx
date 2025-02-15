// @mui
import { Stack } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';
//
import { useCart } from 'src/contexts/cart-context';
import { useWishlist } from 'src/contexts/wishlist-context';
import EcommerceCartItem from './EcommerceCartItem';

// ----------------------------------------------------------------------

export default function EcommerceCartList({ wishlist = false }) {
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  const items = wishlist ? wishlistState.items : cartState.items;

  return (
    <Scrollbar>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          px: 3,
          py: 2,
          typography: 'subtitle2',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack flexGrow={1}>Item</Stack>
        {!wishlist && <Stack sx={{ width: 120 }}>Qty</Stack>}
        {!wishlist && <Stack sx={{ width: 120 }}>Subtotal</Stack>}
        <Stack sx={{ width: 36 }} />
        {wishlist && <Stack sx={{ width: 36 }} />}
      </Stack>

      <Stack sx={{ px: 3 }}>
        {items.map((item) => (
          <EcommerceCartItem 
            key={item.product.id} 
            item={item} 
            wishlist={wishlist} 
          />
        ))}
      </Stack>
    </Scrollbar>
  );
}
