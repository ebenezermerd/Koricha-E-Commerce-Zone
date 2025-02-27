import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Button, Rating, Typography, TextField, Divider, StackProps, Grid, Box } from '@mui/material';
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

  const renderPrice = (
    <ProductPrice
      price={price}
      priceSale={priceSale}
      sx={{ typography: 'h4', marginBottom: 2 }}
    />
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Button
        size="large"
        variant={isInWishlist ? "contained" : "outlined"}
        startIcon={<Iconify icon="carbon:favorite" />}
        sx={{ flexGrow: 1 }}
        onClick={handleToggleWishlist}
        disabled={!isInWishlist && (!selectedColor || !selectedSize)}
      >
        <Box sx={{ lineHeight: 1.2 }}>
          {isInWishlist 
            ? 'Added to Wishlist' 
            : (!selectedColor || !selectedSize)
              ? 'Select Options'
              : 'Add to Wishlist'
          }
        </Box>
      </Button>
    </Stack>
  );

  const renderColorOptions = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Colors</Typography>
      <ProductColorPicker
        selected={selectedColor}
        onSelectColor={(color) => setSelectedColor(color)}
        options={colors.map(color => ({
          label: color,
          value: color,
        }))}
      />
    </Stack>
  );

  const renderSizeOptions = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Sizes</Typography>
      <Stack direction="row" spacing={1}>
        {sizes.map((size) => (
          <Button
            key={size}
            size="small"
            variant={selectedSize === size ? 'contained' : 'outlined'}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </Button>
        ))}
      </Stack>
    </Stack>
  );

  const renderQuantity = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Quantity</Typography>
      <Stack direction="row" spacing={1}>
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
        />
        {quantityInCart > 0 && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({quantityInCart} in cart)
          </Typography>
        )}
      </Stack>
    </Stack>
  );

  return (
    <Stack spacing={3} {...other}>
      <Stack spacing={2}>
        <Typography variant="h4">{name}</Typography>

        {caption && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {caption}
          </Typography>
        )}

        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating value={rating} precision={0.1} readOnly />
          {review && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({review} reviews)
            </Typography>
          )}
        </Stack>

        {renderPrice}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {colors.length > 0 && renderColorOptions}

      {sizes.length > 0 && renderSizeOptions}

      {renderQuantity}

      {available && (
        <Typography variant="subtitle2" sx={{ color: 'success.main' }}>
          {available} items available
        </Typography>
      )}

      {vendor?.name && (
        <Stack spacing={1}>
          <Typography variant="subtitle2">Vendor</Typography>
          <Typography variant="body2">{vendor.name}</Typography>
          {vendor.phone && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Phone: {vendor.phone}
            </Typography>
          )}
        </Stack>
      )}

      <Grid container sx={{ flexGrow: 1, gap: 2 }}>
        <Grid item xs={12} md={5}>
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
            onClick={handleAddCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <Box sx={{ lineHeight: 1 }}>Checking Availability...</Box>
            ) : (
              'Add to Cart'
            )}
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
        {renderShare}
        </Grid>
      </Grid>
    </Stack>
  );
}
