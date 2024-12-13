import React, { useState, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Box, Stack } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import { useCarousel, Carousel, CarouselArrowBasicButtons, CarouselDotButtons } from 'src/components/carousel';
// types
import { ITestimonialProps } from 'src/types/testimonial';
// local components
import TestimonialItem from './TestimonialItem';
// plugins
import Autoplay from 'embla-carousel-autoplay';

type Props = {
  testimonials: ITestimonialProps[];
};

export default function TestimonialEcommerce({ testimonials }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  const slidesToShow = isMdUp ? 4 : isSmUp ? 2 : 1;

  const carousel = useCarousel(
    { loop: true, axis: 'x', slidesToShow: slidesToShow },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  const handlePrev = () => {
    carousel.arrows.onClickPrev();
  };

  const handleNext = () => {
    carousel.arrows.onClickNext();
  };

  return (
    <Container
      sx={{
        pt: 8,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: { xs: 'center', md: 'unset' }, flexGrow: 1 }}>
          Popular Reviews
        </Typography>
      </Stack>

      <Carousel carousel={carousel}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id} sx={{ px: 1.5 }}>
            <TestimonialItem testimonial={testimonial} />
          </Box>
        ))}
      </Carousel>

      {isMdUp && (
        <CarouselArrowBasicButtons
          options={carousel.options}
          disablePrev={carousel.arrows.disablePrev}
          disableNext={carousel.arrows.disableNext}
          onClickPrev={handlePrev}
          onClickNext={handleNext}
          sx={{ mt: 8, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        />
      )}

      <CarouselDotButtons
        selectedIndex={carousel.dots.selectedIndex}
        scrollSnaps={carousel.dots.scrollSnaps}
        onClickDot={carousel.dots.onClickDot}
        sx={{ mt: 8 }}
      />
    </Container>
  );
}