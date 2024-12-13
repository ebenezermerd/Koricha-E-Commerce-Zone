import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

import { bgGradient } from 'src/utils/cssStyles';
import { useCarousel, Carousel, CarouselDotButtons } from 'src/components/carousel';
import { _productsCarousel } from 'src/_mock';
import { EcommerceProductItemHero } from '../product/item';
// Import the specific arrow buttons functions
import { CarouselArrowBasicButtons, CarouselArrowNumberButtons, CarouselArrowFloatButtons } from 'src/components/carousel/components/carousel-arrow-buttons';

export default function EcommerceLandingHero() {
  const theme = useTheme();

  // Define carousel options
  const options = {
    axis: 'x' as 'x' | 'y',
    loop: true,
    slidesToShow: 1,
    // Add other options as needed
  };

  // Initialize the carousel
  const carousel = useCarousel(options);

  return (
    <Container sx={{ pt: { xs: 5, md: 12 } }}>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Carousel carousel={carousel}>
          {_productsCarousel.map((product) => (
            <EcommerceProductItemHero key={product.id} product={product} />
          ))}
        </Carousel>
      </Box>
      {/* Dots */}
      <CarouselDotButtons
        onClickDot={carousel.dots.onClickDot}
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        variant="rounded"
      />
      {/* Arrows */}
      <CarouselArrowBasicButtons
        disablePrev={carousel.arrows.disablePrev}
        disableNext={carousel.arrows.disableNext}
        onClickPrev={carousel.arrows.onClickPrev}
        onClickNext={carousel.arrows.onClickNext}
      />
      {/* Additional controls like thumbs, progress bar, etc., can be added here */}
    </Container>
  );
}