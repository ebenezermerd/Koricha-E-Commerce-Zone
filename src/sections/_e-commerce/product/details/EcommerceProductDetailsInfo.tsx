import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Button, Rating, Typography, TextField, Divider, StackProps, Grid } from '@mui/material';
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


// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#FA541C', value: 'red' },
  { label: '#754FFE', value: 'violet' },
  { label: '#00B8D9', value: 'cyan' },
  { label: '#36B37E', value: 'green' },
];

const MEMORY_OPTIONS = [
  { label: '128GB', value: '128gb' },
  { label: '256GB', value: '256gb' },
  { label: '512GB', value: '512gb' },
  { label: '1TB', value: '1tb' },
];

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
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Check if product is in wishlist
  const isInWishlist = wishlistState.items.some(item => item.product.id === id);

  const handleAddCart = () => {
    if (!selectedColor || !selectedSize) {
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
          available: available || 0,
        },
        quantity,
        colors: [selectedColor],
        size: selectedSize,
      },
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      wishlistDispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: { productId: id },
      });
    } else {
      if (!selectedColor || !selectedSize) {
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
        {isInWishlist 
          ? 'Added to Wishlist' 
          : (!selectedColor || !selectedSize)
            ? 'Select Options'
            : 'Add to Wishlist'
        }
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
          onIncrease={() => setQuantity(Math.min(available || 0, quantity + 1))}
          disabledDecrease={quantity <= 1}
          disabledIncrease={quantity >= (available || 0)}
        />
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
          disabled={!selectedColor || !selectedSize || !quantity}
        >
          Add to Cart
        </Button>
        </Grid>
        <Grid item xs={12} md={5}>
        {renderShare}
        </Grid>
      </Grid>
    </Stack>
  );
}
