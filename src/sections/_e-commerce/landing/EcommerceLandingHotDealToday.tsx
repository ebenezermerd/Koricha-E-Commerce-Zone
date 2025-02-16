import { useState, useRef } from 'react';
import { add } from 'date-fns';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, Skeleton } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// services
import { useGetProducts } from 'src/services/useProducts';
// components
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from 'src/components/carousel';
//
import { ProductCountdownBlock } from '../components';
import { EcommerceProductItemHot } from '../product/item';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function EcommerceLandingHotDealToday() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const { products, productsLoading } = useGetProducts();

  // Filter hot deal products (e.g., products with high ratings and sales)
  const hotDealProducts = products?.filter(
    (product) => product.rating >= 4 || product.totalSold > 1 || product.priceSale > 0
  );

  const carouselOptions = {
    slidesToShow: isMdUp ? 6 : 2,
    axis: 'x' as const,
    loop: true,
  };

  const carousel = useCarousel(carouselOptions);

  if (productsLoading) {
    return (
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  if (!hotDealProducts?.length) {
    return null;
  }

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
        position: 'relative',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{ mb: 8 }}
      >
        <Stack sx={{ mb: 4 }} alignItems={{ xs: 'center', md: 'flex-start' }}>
        <Typography
           variant="h3"
           sx={{
             background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
             backgroundClip: 'text',
             WebkitBackgroundClip: 'text',
             color: 'transparent',
             fontWeight: 'bold',
           }}
        >
          🔥 Hot Deal Today
        </Typography>
        <Typography variant="body2" sx={{ pl: 5, color: 'text.secondary' }}>
          Discover our hottest deals and exclusive offers
        </Typography>
        </Stack>


        <ProductCountdownBlock
          hiddenLabel
          expired={add(new Date(), { hours: 1, minutes: 30 })}
          sx={{
            '& .value': {
              width: 36,
              height: 32,
              color: 'grey.800',
              bgcolor: 'text.primary',
              ...(theme.palette.mode === 'light' && {
                color: 'common.white',
              }),
            },
            '& .separator': { color: 'text.primary' },
          }}
        />

        {isMdUp && (
          <CarouselArrowBasicButtons
            options={carousel.options}
            onClickPrev={carousel.arrows.onClickPrev}
            onClickNext={carousel.arrows.onClickNext}
            disablePrev={carousel.arrows.disablePrev}
            disableNext={carousel.arrows.disableNext}
            sx={{
              '& .arrow-btn': {
                opacity: 0.48,
                width: 40,
                height: 40,
                color: 'common.white',
                background: (theme) => alpha(theme.palette.grey[900], 0.48),
                borderRadius: '50%',
                '&:hover': {
                  opacity: 1,
                  background: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              },
              position: 'absolute',
              right: 0,
              top: { md: 16 },
              '& .mnl__carousel__btn--prev': { left: 'auto', right: 64 },
              '& .mnl__carousel__btn--next': { right: 16 },
            }}
          />
        )}
      </Stack>

      <Carousel carousel={carousel}>
        {hotDealProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              py: 0.5,
              px: { xs: 1, md: 1.5 },
            }}
          >
            <EcommerceProductItemHot product={product} hotProduct />
          </Box>
        ))}
      </Carousel>

      {!isMdUp && (
        <CarouselDotButtons
          selectedIndex={carousel.dots.selectedIndex}
          scrollSnaps={carousel.dots.scrollSnaps}
          onClickDot={carousel.dots.onClickDot}
          sx={{ mt: 8 }}
        />
      )}
    </Container>
  );
}