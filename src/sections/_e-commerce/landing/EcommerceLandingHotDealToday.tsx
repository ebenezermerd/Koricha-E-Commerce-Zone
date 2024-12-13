import { useState, useRef } from 'react';
import { add } from 'date-fns';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// _mock
import { _products } from 'src/_mock';
// components
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from 'src/components/carousel';
//
import { ProductCountdownBlock } from '../components';
import { EcommerceProductItemHot } from '../product/item';

// ----------------------------------------------------------------------

export default function EcommerceLandingHotDealToday() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  // Initialize useCarousel with options
  const carouselOptions = {
    slidesToShow: isMdUp ? 6 : 2,
    axis: 'x' as const,
    loop: true,
  };

  const carousel = useCarousel(carouselOptions);

  const handlePrev = () => {
    carousel.arrows.onClickPrev();
  };

  const handleNext = () => {
    carousel.arrows.onClickNext();
  };

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={3}
        sx={{
          mb: 8,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          🔥 Hot Deal Today
        </Typography>

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
            onClickPrev={handlePrev}
            onClickNext={handleNext}
            sx={{ justifyContent: 'flex-end' }}
            disablePrev={carousel.arrows.disablePrev}
            disableNext={carousel.arrows.disableNext}
          />
        )}
      </Stack>

      <Carousel carousel={carousel}>
        {_products.map((product) => (
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
          //dotCount={carousel.dots.dotCount}
          selectedIndex={carousel.dots.selectedIndex}
          scrollSnaps={carousel.dots.scrollSnaps}
          onClickDot={carousel.dots.onClickDot}
          sx={{ mt: 8 }}
        />
      )}
    </Container>
  );
}