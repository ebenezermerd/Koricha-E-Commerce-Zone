import React, { useState, useRef, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Box, Stack, Card, Skeleton } from '@mui/material';
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
// services
import { useGetTestimonials } from 'src/services/useTestimonials';

export default function TestimonialEcommerce() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  const { testimonials, testimonialsLoading } = useGetTestimonials();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const slidesToShow = isMdUp ? 4 : isSmUp ? 2 : 1;

  const carousel = useCarousel(
    { 
      loop: true, 
      axis: 'x', 
      slidesToShow,
      dragFree: true,
    },
    [
      Autoplay({ 
        playOnInit: true, 
        delay: 5000,
        stopOnInteraction: false,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
  );

  const handlePrev = () => carousel.arrows.onClickPrev();
  const handleNext = () => carousel.arrows.onClickNext();

  if (testimonialsLoading) {
    return <TestimonialLoadingSkeleton />;
  }

  return (
    <Container
      sx={{
        pt: 8,
        pb: { xs: 8, md: 10 },
        overflow: 'hidden',
      }}
    >
      <Stack 
        direction="row" 
        alignItems="center" 
        sx={{ 
          mb: 8,
          position: 'relative',
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: { xs: 'center', md: 'unset' }, 
            flexGrow: 1,
            background: (theme) => 
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          What Our Customers Say
        </Typography>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Carousel 
          carousel={carousel}
          sx={{
            '& .embla__container': {
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        >
          {testimonials?.map((testimonial: { id: any; name?: string; review?: string; role?: string | undefined; avatar?: string | undefined; rating?: number | undefined; postDate?: string | number | Date | undefined; }, index: React.SetStateAction<number | null>) => (
            <Box 
              key={testimonial.id} 
              sx={{ 
                px: 1.5,
                transition: 'all 0.3s ease',
                transform: hoveredIndex === index ? 'translateY(-12px)' : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  bgcolor: 'background.neutral',
                  transition: theme.transitions.create(['box-shadow', 'transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  ...(hoveredIndex === index && {
                    boxShadow: theme.customShadows.z24,
                  }),
                }}
              >
                <TestimonialItem testimonial={testimonial} />
              </Card>
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
            sx={{ 
              mt: 8, 
              position: 'absolute', 
              bottom: -80, 
              left: '50%', 
              transform: 'translateX(-50%)',
            }}
          />
        )}

        <CarouselDotButtons
          selectedIndex={carousel.dots.selectedIndex}
          scrollSnaps={carousel.dots.scrollSnaps}
          onClickDot={carousel.dots.onClickDot}
          sx={{ 
            mt: 8,
            '& .dot': {
              transition: 'all 0.2s ease-in-out',
              '&.active': {
                width: 24,
                bgcolor: 'primary.main',
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}

function TestimonialLoadingSkeleton() {
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');
  const slidesToShow = isMdUp ? 4 : isSmUp ? 2 : 1;

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ width: 200 }}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        </Stack>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: `repeat(${slidesToShow}, 1fr)`,
          }}
        >
          {[...Array(slidesToShow)].map((_, index) => (
            <Card key={index} sx={{ p: 3, height: '240px' }}>
              <Stack spacing={2}>
                <Skeleton variant="circular" width={48} height={48} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="rectangular" height={80} />
              </Stack>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}