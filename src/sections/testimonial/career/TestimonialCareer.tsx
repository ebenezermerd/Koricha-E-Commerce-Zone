import React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container, Unstable_Grid2 as Grid } from '@mui/material';
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

export default function TestimonialCareer({ testimonials }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  const slidesToShow = isMdUp ? 1 : isSmUp ? 2 : 3;

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
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: { xs: 10, md: 15 },
        position: 'relative',
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 5, textAlign: 'center' }}>
              What Our Customer Say
            </Typography>

            <Carousel carousel={carousel}>
              {testimonials.map((testimonial) => (
                <TestimonialItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Carousel>
          </Grid>
        </Grid>

        {isMdUp && (
          <CarouselArrowBasicButtons
            options={carousel.options}
            disablePrev={carousel.arrows.disablePrev}
            disableNext={carousel.arrows.disableNext}
            onClickPrev={handlePrev}
            onClickNext={handleNext}
            sx={{ mt: 10, width: 1 }}
          />
        )}

        <CarouselDotButtons
          selectedIndex={carousel.dots.selectedIndex}
          scrollSnaps={carousel.dots.scrollSnaps}
          onClickDot={carousel.dots.onClickDot}
          sx={{ mt: 8, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        />
      </Container>
    </Box>
  );
}