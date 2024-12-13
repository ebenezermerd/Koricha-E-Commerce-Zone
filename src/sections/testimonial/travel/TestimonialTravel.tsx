import React, { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Unstable_Grid2 as Grid } from '@mui/material';
// types
import { ITestimonialProps } from 'src/types/testimonial';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import { useCarousel, Carousel, CarouselArrowBasicButtons, CarouselDotButtons } from 'src/components/carousel';
// plugins
import Autoplay from 'embla-carousel-autoplay';
//
import TestimonialItem from './TestimonialItem';

// ----------------------------------------------------------------------

type Props = {
  testimonials: ITestimonialProps[];
};

export default function TestimonialTravel({ testimonials }: Props) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

 // Using useCarousel hook to manage carousel state and options
 const carousel = useCarousel(
  { loop: true },
  [Autoplay({ playOnInit: true, delay: 8000 })]
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
        py: { xs: 10, md: 15 },
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid xs={12} md={6}>
          <Typography
            variant="h2"
            sx={{
              mb: 5,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            What Our Customer Say
          </Typography>

          {/* Carousel component with proper passing of carousel state */}
          <Carousel carousel={carousel}>
            {testimonials.map((testimonial) => (
              <TestimonialItem key={testimonial.id} testimonial={testimonial} />
            ))}
          </Carousel>
        </Grid>

        {isMdUp && (
          <Grid xs={12} md={6}>
            <Image
              alt="travel testimonial"
              src="/assets/images/travel/travel_testimonial.png"
              sx={{ maxWidth: 296, ml: 'auto' }}
            />
          </Grid>
        )}
      </Grid>

      {/* Conditional rendering of arrows for medium and up screens */}
      {isMdUp && (
        <CarouselArrowBasicButtons
          options={carousel.options}
          disablePrev={carousel.arrows.disablePrev}
          disableNext={carousel.arrows.disableNext}
          onClickPrev={handlePrev}
          onClickNext={handleNext}
          sx={{ mt: 10 }}
        />
      )}

      {/* Rendering the carousel dots for navigation */}
      <CarouselDotButtons
        selectedIndex={carousel.dots.selectedIndex}
        scrollSnaps={carousel.dots.scrollSnaps}
        onClickDot={carousel.dots.onClickDot}
        sx={{ position: 'absolute', top: 16, left: 16, color: 'primary.light' }}
      />
    </Container>
  );
}