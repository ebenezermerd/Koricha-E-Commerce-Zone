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
import axios from 'src/utils/axios';
import { toast } from 'src/components/snackbar';
import { useState, useEffect } from 'react';

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

interface ProductAvailability {
  available: number;
  inventoryType: 'in_stock' | 'low_stock' | 'out_of_stock';
  status: string;
  maxPurchaseQuantity: number;
}

export default function EcommerceCartItem({ item, wishlist }: Props) {
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();
  const { product, quantity, colors, size } = item;
  const [availability, setAvailability] = useState<ProductAvailability | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkProductAvailability(product.id);
  }, [product.id]);

  const checkProductAvailability = async (productId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/products/${productId}/availability`);
      setAvailability(response.data);
    } catch (error) {
      console.error('Failed to check product availability:', error);
      toast.error('Failed to check product availability');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeQuantity = async (newQuantity: number) => {
    if (!availability) return;

    if (newQuantity > availability.maxPurchaseQuantity) {
      toast.error(`Maximum purchase quantity is ${availability.maxPurchaseQuantity}`);
      return;
    }

    if (newQuantity > availability.available) {
      toast.error(`Only ${availability.available} items available in stock`);
      return;
    }

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

  const handleAddToCart = async () => {
    if (!availability) {
      toast.error('Unable to check product availability');
      return;
    }

    if (availability.inventoryType === 'out_of_stock') {
      toast.error('Product is out of stock');
      return;
    }

    if (quantity > availability.available) {
      toast.error(`Only ${availability.available} items available in stock`);
      return;
    }

    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: Math.min(quantity, availability.maxPurchaseQuantity),
        colors,
        size,
      },
    });

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
          disabledIncrease={
            isLoading || 
            !availability || 
            quantity >= availability.maxPurchaseQuantity || 
            quantity >= availability.available
          }
          sx={{ width: 96 }}
        />
        {availability?.inventoryType === 'low_stock' && (
          <Typography variant="caption" color="warning.main" sx={{ mt: 1 }}>
            Only {availability.available} left
          </Typography>
        )}
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
