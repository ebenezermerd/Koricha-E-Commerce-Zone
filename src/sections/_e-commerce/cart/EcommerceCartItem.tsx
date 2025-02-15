// @mui
import { Stack, IconButton, Typography, Box } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// types
import { IProductItemProps } from 'src/types/product';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { ICheckoutItem, useCart } from 'src/contexts/cart-context';
import { useWishlist } from 'src/contexts/wishlist-context';
import { IncrementerButton } from 'src/sections/_e-commerce/components/incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  item: {
    product: ICheckoutItem;
    quantity: number;
    colors: string[];
    size: string;
  };
  wishlist: boolean;
};

export default function EcommerceCartItem({ item, wishlist }: Props) {
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();
  const { product, quantity, colors, size } = item;

  const handleChangeQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      if (wishlist) {
        wishlistDispatch({
          type: 'UPDATE_QUANTITY',
          payload: { productId: product.id, quantity: newQuantity },
        });
      } else {
        cartDispatch({
          type: 'UPDATE_QUANTITY',
          payload: { productId: product.id, quantity: newQuantity },
        });
      }
    }
  };

  const handleRemove = () => {
    if (wishlist) {
      wishlistDispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: { productId: product.id },
      });
    } else {
      cartDispatch({
        type: 'REMOVE_FROM_CART',
        payload: { productId: product.id },
      });
    }
  };

  const handleAddToCart = () => {
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        colors,
        size,
      },
    });
    // Remove from wishlist after adding to cart
    wishlistDispatch({
      type: 'MOVE_TO_CART',
      payload: { productId: product.id },
    });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={product.coverImg}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{product.name}</Typography>
          {colors && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Colors: <Box component="span" sx={{ color: colors, backgroundColor: colors, width: 30, height: 14, borderRadius: '10%', border: '1px solid', display: 'inline-block', verticalAlign: 'middle', mr: 0.5 }} />
            </Typography>
          )}
          {size && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Size: {size}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack sx={{ width: 120 }}>
        <IncrementerButton
          quantity={quantity}
          onDecrease={() => handleChangeQuantity(quantity - 1)}
          onIncrease={() => handleChangeQuantity(quantity + 1)}
          disabledDecrease={quantity <= 1}
          disabledIncrease={quantity >= 10}
          sx={{ width: 96 }}
        />
      </Stack>

      {!wishlist && (
        <Stack sx={{ width: 120, typography: 'subtitle2' }}>
          {fCurrency(product.price * quantity)}
        </Stack>
      )}

      <IconButton onClick={handleRemove}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>

      {wishlist && (
        <IconButton onClick={handleAddToCart} color="primary">
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}
    </Stack>
  );
}
