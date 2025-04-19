// @mui
import { Stack, IconButton, Typography, Box, Divider, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
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
import { paths } from 'src/routes/paths';

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
  
  // Check if additional costs apply
  const hasAdditionalCost = product.quantity_threshold && quantity > product.quantity_threshold;
  
  // Calculate additional cost if applicable
  const calculateAdditionalCost = () => {
    if (!hasAdditionalCost) return 0;
    if (product.additional_cost_type === 'percentage') {
      return product.price * ((product.additional_cost_percentage ?? 0) / 100) * quantity;
    }
    return product.additional_cost_fixed || 0;
  };
  const additionalCost = calculateAdditionalCost();

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

  const hasColors = colors && colors.length > 0;
  const hasSize = size && size.length > 0;

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Image
          src={product.coverImg}
          alt={product.name}
          sx={{ width: 80, height: 80, borderRadius: 1.5 }}
        />
      </Box>

      <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {product.name}
        </Typography>

        {hasColors && (
          <Stack direction="row" alignItems="center">
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Color:
            </Typography>
            <Box
              sx={{
                ml: 0.75,
                width: 16,
                height: 16,
                borderRadius: 0.5,
                bgcolor: colors[0],
                ...(colors[0] === '#FFFFFF' && {
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }),
              }}
            />
          </Stack>
        )}

        {hasSize && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Size: {size}
          </Typography>
        )}
        
        {hasAdditionalCost && (
          <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 'bold', mt: 0.5 }}>
            Additional cost: {fCurrency(additionalCost)}
            <Tooltip title={
              product.additional_cost_type === 'percentage' 
                ? `${product.additional_cost_percentage}% additional cost for orders above ${product.quantity_threshold} items` 
                : `Fixed additional cost of ${fCurrency(product.additional_cost_fixed)} for orders above ${product.quantity_threshold} items`
            }>
              <Box component="span" sx={{ display: 'inline-flex', ml: 0.5 }}>
                <Iconify icon="eva:info-outline" width={16} height={16} />
              </Box>
            </Tooltip>
          </Typography>
        )}

        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.primary',
            mt: 0.5,
          }}
        >
          {fCurrency(product.price)}
        </Typography>
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
          {fCurrency(product.price * quantity + additionalCost)}
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
