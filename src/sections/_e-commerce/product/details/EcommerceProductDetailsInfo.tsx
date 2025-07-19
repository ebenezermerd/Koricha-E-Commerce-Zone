import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { 
  Stack, 
  Button, 
  Rating, 
  Typography, 
  Divider, 
  StackProps, 
  Grid, 
  Box,
  Card,
  CardContent,
  Chip,
  alpha
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// routes
import { paths } from 'src/routes/paths';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
//
import { ProductColorPicker, ProductOptionPicker, ProductPrice } from '../../components';
import { IncrementerButton } from 'src/sections/_e-commerce/components/incrementer-button';
import { useCart } from 'src/contexts/cart-context';
import { useWishlist } from 'src/contexts/wishlist-context';
import { toast } from 'src/components/snackbar';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  id: string;
  name: string;
  price: number;
  rating?: number;
  review?: number;
  priceSale?: number;
  caption?: string;
  sizes?: string[];
  colors?: string[];
  available?: number;
  inventoryType?: string;
  coverImg: string;
  vendor?: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
}

interface ProductAvailability {
  available: number;
  inventoryType: 'in_stock' | 'low_stock' | 'out_of_stock';
  status: string;
  maxPurchaseQuantity: number;
}

export default function EcommerceProductDetailsInfo({
  id,
  name,
  price,
  sizes = [],
  colors = [],
  caption,
  rating = 0,
  review = 0,
  priceSale,
  available,
  inventoryType,
  vendor,
  coverImg,
  ...other
}: Props) {
  const isMdUp = useResponsive('up', 'md');
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [availability, setAvailability] = useState<ProductAvailability | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if product is in wishlist
  const isInWishlist = wishlistState.items.some(item => item.product.id === id);

  // Calculate how many of this item are already in cart
  const itemInCart = cartState.items.find(item => item.product.id === id);
  const quantityInCart = itemInCart?.quantity || 0;

  const checkProductAvailability = async (productId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/products/${productId}/availability`);
      setAvailability(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to check product availability:', error);
      toast.error('Failed to check product availability');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select a color and size');
      return;
    }

    const productAvailability = await checkProductAvailability(id);
    
    if (!productAvailability) {
      return;
    }

    if (productAvailability.inventoryType === 'out_of_stock') {
      toast.error('Product is out of stock');
      return;
    }

    // Consider both backend availability and local state
    const effectiveAvailable = Math.min(productAvailability.available, available || 0);
    const remainingAvailable = effectiveAvailable - quantityInCart;

    if (remainingAvailable <= 0) {
      toast.error('You have already added all available items to cart');
      return;
    }

    if (quantity > remainingAvailable) {
      toast.error(`Only ${remainingAvailable} more items available to add`);
      return;
    }

    const maxAllowedQuantity = Math.min(
      productAvailability.maxPurchaseQuantity - quantityInCart,
      remainingAvailable
    );

    if (quantity > maxAllowedQuantity) {
      toast.error(`You can only add ${maxAllowedQuantity} more items`);
      return;
    }

    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: {
          id,
          name,
          price,
          coverImg,
          subtotal: price * quantity,
          available: effectiveAvailable,
        },
        quantity,
        colors: [selectedColor],
        size: selectedSize,
      },
    });

    toast.success('Product added to cart successfully');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      wishlistDispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: { productId: id },
      });
      toast.success('Product removed from wishlist');
    } else {
      if (!selectedColor || !selectedSize) {
        toast.error('Please select a color and size');
        return;
      }

      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        payload: {
          product: {
            id,
            name,
            price,
            coverImg,
            subtotal: price * quantity,
            available: available || 0,
          },
          quantity,
          colors: [selectedColor],
          size: selectedSize,
        },
      });
      toast.success('Product added to wishlist');
    }
  };

  return (
    <Stack spacing={3} {...other}>
      {/* Product Header */}
      <Box>
        <Typography variant="h4" gutterBottom>{name}</Typography>

        {caption && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {caption}
          </Typography>
        )}

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={rating} precision={0.1} readOnly />
          {review > 0 && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({review} reviews)
            </Typography>
          )}
        </Stack>

        <ProductPrice
          price={price}
          priceSale={priceSale}
          sx={{ typography: 'h4' }}
        />
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Product Options */}
      <Box sx={{ py: 1 }}>
        {/* Color Selection */}
        {colors.length > 0 && (
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Colors</Typography>
            <ProductColorPicker
              selected={selectedColor}
              onSelectColor={(color) => setSelectedColor(color)}
              options={colors.map(color => ({
                label: color,
                value: color,
              }))}
            />
          </Stack>
        )}

        {/* Size Selection */}
        {sizes.length > 0 && (
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Sizes</Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  size="small"
                  color="primary"
                  variant={selectedSize === size ? 'contained' : 'outlined'}
                  onClick={() => setSelectedSize(size)}
                  sx={{ 
                    minWidth: 48, 
                    height: 40,
                    borderRadius: 1
                  }}
                >
                  {size}
                </Button>
              ))}
            </Stack>
          </Stack>
        )}

        {/* Quantity Selection */}
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Quantity</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IncrementerButton
              quantity={quantity}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              onIncrease={() => {
                const remainingAvailable = (available || 0) - quantityInCart;
                setQuantity(Math.min(remainingAvailable, quantity + 1));
              }}
              disabledDecrease={quantity <= 1}
              disabledIncrease={
                quantity >= ((available || 0) - quantityInCart) ||
                isLoading ||
                Boolean(availability?.maxPurchaseQuantity && quantity >= availability.maxPurchaseQuantity - quantityInCart)
              }
              sx={{ height: 40 }}
            />
            {quantityInCart > 0 && (
              <Chip 
                size="small" 
                color="info" 
                label={`${quantityInCart} in cart`} 
                variant="outlined"
              />
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Availability Info */}
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        {available && available > 0 ? (
          <Chip
            icon={<Iconify icon="eva:checkmark-circle-fill" />}
            label={`${available} items available`}
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            icon={<Iconify icon="eva:alert-triangle-fill" />}
            label="Out of stock"
            color="error"
            variant="outlined"
          />
        )}

        {vendor?.name && (
          <Chip
            icon={<Iconify icon="eva:shopping-bag-outline" />}
            label={`Sold by: ${vendor.name}`}
            variant="outlined"
          />
        )}
      </Stack>

      {/* Action Buttons */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ mt: 3 }}
      >
        <Button
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
          onClick={handleAddCart}
          disabled={isLoading || !selectedColor || !selectedSize}
          sx={{ 
            height: 48,
            boxShadow: (theme) => theme.customShadows.z8
          }}
        >
          {isLoading ? 'Checking Availability...' : 'Add to Cart'}
        </Button>
        
        <Button
          fullWidth
          size="large"
          variant={isInWishlist ? "contained" : "outlined"}
          color={isInWishlist ? "error" : "primary"}
          startIcon={<Iconify icon={isInWishlist ? "carbon:favorite-filled" : "carbon:favorite"} />}
          onClick={handleToggleWishlist}
          disabled={!isInWishlist && (!selectedColor || !selectedSize)}
          sx={{ height: 48 }}
        >
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </Stack>
    </Stack>
  );
}
