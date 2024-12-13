import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
// types
import { MenuCarouselProps } from './types';
// components
import Image from '../image';
import TextMaxLine from '../text-max-line';
import { useCarousel, Carousel, CarouselArrowBasicButtons, CarouselDotButtons } from '../carousel';

// ----------------------------------------------------------------------

export default function MenuCarousel({ products, numberShow, sx }: MenuCarouselProps) {
  const theme = useTheme();

  const carousel = useCarousel({
    loop: true,
    axis: 'x',
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    dragFree: true,
  });

  const handlePrev = () => {
    carousel.arrows.onClickPrev();
  };

  const handleNext = () => {
    carousel.arrows.onClickNext();
  };

  return (
    <Box sx={{ position: 'relative', pt: 2, ...sx }}>
      <CarouselArrowBasicButtons
        options={carousel.options}
        disablePrev={carousel.arrows.disablePrev}
        disableNext={carousel.arrows.disableNext}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
        sx={{
          position: 'absolute',
          top: 'calc(50% - 40px)',
          '& .mnl__carousel__btn--prev': { left: -8 },
          '& .mnl__carousel__btn--next': { right: -8 },
        }}
      />

      <Carousel carousel={carousel}>
        {products.map((product) => (
          <Box key={product.name} sx={{ px: 1, textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to={product.path}
              color="inherit"
              underline="none"
              sx={{
                display: 'block',
                transition: theme.transitions.create('all'),
                '&:hover': { color: 'primary.main' },
              }}
            >
              <Image
                alt={product.name}
                src={product.image}
                ratio="1/1"
                disabledEffect
                sx={{ borderRadius: 1, mb: 1 }}
              />

              <TextMaxLine variant="caption" sx={{ fontWeight: 'fontWeightSemiBold' }}>
                {product.name}
              </TextMaxLine>
            </Link>
          </Box>
        ))}
      </Carousel>

      <CarouselDotButtons
        selectedIndex={carousel.dots.selectedIndex}
        scrollSnaps={carousel.dots.scrollSnaps}
        onClickDot={carousel.dots.onClickDot}
        sx={{ mt: 3, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
      />
    </Box>
  );
}