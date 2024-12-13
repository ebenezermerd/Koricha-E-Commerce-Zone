import React, { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, Unstable_Grid2 as Grid } from '@mui/material';
// types
import { ITestimonialProps } from 'src/types/testimonial';
// components
import { useCarousel, Carousel, CarouselArrowBasicButtons, CarouselDotButtons } from 'src/components/carousel';
// plugins
import Autoplay from 'embla-carousel-autoplay';
//
import TestimonialItem from './TestimonialItem';

// ----------------------------------------------------------------------

type Props = {
  testimonials: ITestimonialProps[];
};

export default function TestimonialMarketing({ testimonials }: Props) {
  const theme = useTheme();

  // Using useCarousel hook to manage carousel state and options
  const carousel = useCarousel(
    {
      loop: true,
      axis: theme.direction === 'rtl' ? 'y' : 'x', // Adjust axis based on theme direction
    },
    [Autoplay({ playOnInit: true, delay: 5000 })] // Autoplay with 5000ms delay
  );

  const handlePrev = () => {
    carousel.arrows.onClickPrev();
  };

  const handleNext = () => {
    carousel.arrows.onClickNext();
  };

  return (
    <Box sx={{ bgcolor: 'background.neutral', overflow: 'hidden' }}>
      <Container
        sx={{
          position: 'relative',
          py: { xs: 10, md: 15 },
        }}
      >
        <Stack spacing={2} sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Testimonials
          </Typography>

          <Typography variant="h2">Who Love Our Work</Typography>
        </Stack>

        <CarouselArrowBasicButtons
          options={carousel.options}
          disablePrev={carousel.arrows.disablePrev}
          disableNext={carousel.arrows.disableNext}
          onClickPrev={handlePrev}
          onClickNext={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '100%',
            justifyContent: 'space-between',
          }}
        />

        <Grid container spacing={10} justifyContent="center">
          <Grid xs={12} md={8}>
            <Carousel carousel={carousel}>
              {testimonials.map((testimonial) => (
                <TestimonialItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Carousel>
          </Grid>
        </Grid>

        <CarouselDotButtons
          selectedIndex={carousel.dots.selectedIndex}
          scrollSnaps={carousel.dots.scrollSnaps}
          onClickDot={carousel.dots.onClickDot}
          sx={{
            mt: { xs: 8, md: 10 },
            textAlign: 'center',
          }}
        />
      </Container>
    </Box>
  );
}