import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, Unstable_Grid2 as Grid } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import { useCarousel, Carousel, CarouselArrowBasicButtons } from 'src/components/carousel';
// types
import { ITestimonialProps } from 'src/types/testimonial';
// local components 
import { TestimonialItemContent, TestimonialItemThumbnail } from './TestimonialItem';
// plugins
import Autoplay from 'embla-carousel-autoplay';

type Props = {
  testimonials: ITestimonialProps[];
};

export default function TestimonialElearning({ testimonials }: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  const [selected, setSelected] = useState(0);

  // Initialize content carousel
  const contentCarousel = useCarousel(
    {
      loop: false,
      axis: 'x',
      slidesToShow: 1,
    },
    [Autoplay({ playOnInit: false })]
  );

  // Initialize thumbnail carousel
  const thumbnailCarousel = useCarousel(
    {
      loop: false,
      axis: 'x',
      slidesToShow: isMdUp ? 5 : 3,
      align: 'center', // Corrected from centerMode
      slideSpacing: '8px',
    },
    [Autoplay({ playOnInit: true, delay: 3000 })]
  );

  // Synchronize carousels
  useEffect(() => {
    if (!contentCarousel.mainApi || !thumbnailCarousel.mainApi) return;

    const contentApi = contentCarousel.mainApi;
    const thumbnailApi = thumbnailCarousel.mainApi;

    const onSelectContent = () => {
      setSelected(contentApi.selectedScrollSnap());
      thumbnailApi.scrollTo(contentApi.selectedScrollSnap());
    };

    const onSelectThumbnail = () => {
      setSelected(thumbnailApi.selectedScrollSnap());
      contentApi.scrollTo(thumbnailApi.selectedScrollSnap());
    };

    contentApi.on('select', onSelectContent);
    thumbnailApi.on('select', onSelectThumbnail);

    return () => {
      contentApi.off('select', onSelectContent); // Provided both arguments
      thumbnailApi.off('select', onSelectThumbnail); // Provided both arguments
    };
  }, [contentCarousel.mainApi, thumbnailCarousel.mainApi, setSelected]);

  const handlePrev = () => {
    thumbnailCarousel.arrows.onClickPrev();
  };

  const handleNext = () => {
    thumbnailCarousel.arrows.onClickNext();
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        textAlign: 'center',
        overflow: 'hidden',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 5 }}>
              What Our Customer Say
            </Typography>

            <Stack spacing={3}>
              <Carousel carousel={contentCarousel}>
                {testimonials.map((testimonial) => (
                  <TestimonialItemContent key={testimonial.id} testimonial={testimonial} />
                ))}
              </Carousel>

              <Box sx={{ mx: 'auto', maxWidth: { xs: 360, sm: 420 } }}>
                <Carousel carousel={thumbnailCarousel}>
                  {testimonials.map((testimonial, index) => (
                    <TestimonialItemThumbnail
                      key={testimonial.id}
                      testimonial={testimonial}
                      isSelected={selected === index}
                    />
                  ))}
                </Carousel>
              </Box>

              <Stack spacing={0.5}>
                <Typography variant="h6">{testimonials[selected]?.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {testimonials[selected]?.role}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {isMdUp && (
          <CarouselArrowBasicButtons
            options={thumbnailCarousel.options}
            disablePrev={thumbnailCarousel.arrows.disablePrev}
            disableNext={thumbnailCarousel.arrows.disableNext}
            onClickPrev={handlePrev}
            onClickNext={handleNext}
            sx={{ mt: 10, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
          />
        )}
      </Container>
    </Box>
  );
}