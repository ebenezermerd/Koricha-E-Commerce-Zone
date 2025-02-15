import { useState } from 'react';
import { add } from 'date-fns';
// @mui
import {
  Box,
  Stack,
  alpha,
  Button,
  Divider,
  Container,
  Typography,
  StackProps,
  Skeleton,
  Rating,
  useTheme,
} from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
// components
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router-dom';
//
import { ProductColorPicker, ProductOptionPicker, ProductCountdownBlock } from '../components';
import { fCurrency } from 'src/utils/formatNumber';
import { IProductItemProps } from 'types/product';

// ----------------------------------------------------------------------

export default function EcommerceLandingSpecialOffer() {
  const navigate = useNavigate();
  const { products, productsLoading } = useGetProducts();

  // Get special offer product (e.g., product with highest discount)
  const specialOfferProduct = products
    ?.filter(product => 
      product.priceSale > 0 && 
      product.saleLabel.enabled && 
      product.inStock > 0
    )
    .sort((a, b) => (b.price - b.priceSale) - (a.price - a.priceSale))
    [0];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleBuyNow = () => {
    navigate(`${paths.eCommerce.product}/${specialOfferProduct?.id}`);
  };

  if (productsLoading) {
    return (
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Skeleton variant="rectangular" height={500} />
      </Container>
    );
  }

  if (!specialOfferProduct) {
    return null;
  }

  // Transform product colors to picker format
  const colorOptions = specialOfferProduct.colors.map(color => ({
    label: color,
    value: color,
  }));

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Special Offer
      </Typography>

      <Box
        gap={{ xs: 5, md: 8 }}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        <SpecialOfferCountdown
          product={specialOfferProduct}
          expired={add(new Date(), { days: 1, hours: 8 })}
        />

        <Box sx={{ borderRadius: 1.5, bgcolor: 'background.neutral' }}>
          <Image src={specialOfferProduct.coverImg} />
        </Box>

        <SpecialOfferBuyNow
          product={specialOfferProduct}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          colorOptions={colorOptions}
          onChangeColor={handleChangeColor}
          onChangeSize={handleChangeSize}
          onBuyNow={handleBuyNow}
        />
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

interface SpecialOfferCountdownProps extends StackProps {
  product: IProductItemProps;
  expired: Date;
}

function SpecialOfferCountdown({ product, expired, sx, ...other }: SpecialOfferCountdownProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 5,
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: (theme) => theme.customShadows.z24,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        {product.saleLabel.content || 'Special Offer'}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>
        {product.name}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          px: 2,
          py: 1,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }}
      >
        {product.priceSale > 0 
          ? `From ${fCurrency(product.priceSale)}`
          : `From ${fCurrency(product.price)}`
        }
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', my: 3, width: 1 }} />

      <Typography variant="body2" sx={{ mb: 2 }}>
        Deal ends in:
      </Typography>

      <ProductCountdownBlock
        expired={expired}
        sx={{
          '& .value': {
            color: 'text.primary',
            bgcolor: 'transparent',
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          },
          '& .label': { color: 'text.secondary' },
          '& .separator': { color: 'inherit' },
        }}
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

interface SpecialOfferBuyNowProps extends StackProps {
  product: IProductItemProps;
  selectedColor: string;
  selectedSize: string;
  colorOptions: { label: string; value: string; }[];
  onChangeColor: (color: string) => void;
  onChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBuyNow: () => void;
}

function SpecialOfferBuyNow({
  product,
  selectedColor,
  selectedSize,
  colorOptions,
  onChangeColor,
  onChangeSize,
  onBuyNow,
  sx,
  ...other
}: SpecialOfferBuyNowProps) {
  const theme = useTheme();
  
  // Transform product sizes to picker format
  const sizeOptions = product.sizes.map(size => ({
    label: size,
    value: size,
  }));

  return (
    <Stack spacing={3} alignItems="flex-start" {...other}>
      {/* Product Title and Description Section */}
      <Stack 
        spacing={2}
        sx={{
          p: 3,
          width: 1,
          borderRadius: 2,
          bgcolor: 'background.neutral',
          boxShadow: theme.customShadows.z8,
        }}
      >
        <Typography variant="h4" sx={{ color: 'text.primary' }}>
          {product.name}
        </Typography>

        
      </Stack>

      {/* Ratings and Sub-Description Card */}
      <Box
        sx={{
          p: 3,
          width: 1,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: theme.customShadows.z16,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <Stack spacing={2}>
          {/* Ratings Section */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            }}
          >
            <Rating 
              value={product.rating} 
              precision={0.5} 
              readOnly 
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'primary.main',
                },
              }}
            />
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              ({product.totalRatings} ratings)
            </Typography>
          </Stack>

          {/* Sub-Description */}
          {product.subDescription && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontStyle: 'italic',
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 2,
                py: 0.5,
              }}
            >
              {product.subDescription}
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Color and Size Selection Section */}
      <Box
        sx={{
          py: 3,
          width: 1,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        {/* Color Options */}
        {colorOptions.length > 0 && (
          <Stack 
            spacing={1.5}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.neutral',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Color
            </Typography>
            <ProductColorPicker
              selected={selectedColor}
              onSelectColor={onChangeColor}
              options={colorOptions}
              sx={{
                gap: 1,
                justifyContent: 'flex-start',
              }}
            />
          </Stack>
        )}

        {/* Size Options */}
        {sizeOptions.length > 0 && (
          <Stack 
            spacing={1.5}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.neutral',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Size
            </Typography>
            <ProductOptionPicker
              value={selectedSize}
              onChange={onChangeSize}
              options={sizeOptions}
              sx={{
                gap: 1,
                justifyContent: 'flex-start',
              }}
            />
          </Stack>
        )}
      </Box>

      {/* Buy Now Button */}
      <Button 
        size="large" 
        color="primary" 
        variant="contained"
        onClick={onBuyNow}
        disabled={!selectedSize || !selectedColor}
        sx={{
          width: 1,
          height: 48,
          fontSize: 16,
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        Buy Now
      </Button>
    </Stack>
  );
}
