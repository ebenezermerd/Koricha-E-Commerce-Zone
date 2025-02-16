import React, { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Box, Stack, Card, Skeleton } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import { useCarousel, Carousel, CarouselArrowBasicButtons } from 'src/components/carousel';
import { useGetReviews } from 'src/services/useReview';
// plugins
import Autoplay from 'embla-carousel-autoplay';
import Iconify from 'src/components/iconify';
import { bgGradient, bgBlur } from "src/utils/cssStyles";


export default function TestimonialEcommerce() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  const { reviews, reviewsLoading } = useGetReviews();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const slidesToShow = isMdUp ? 3 : isSmUp ? 2 : 1;

  const autoplayPlugin = Autoplay({
    playOnInit: true,
    delay: 5000,
    stopOnInteraction: true,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  });

  const carousel = useCarousel({
    loop: true,
    axis: 'x',
    slidesToShow,
    dragFree: true,
  }, [autoplayPlugin]);

  // Filter and sort reviews to get the most helpful and highest rated ones
  const topReviews = reviews
    ?.filter(review => review.rating >= 4 && review.helpful > 0)
    ?.sort((a, b) => b.helpful - a.helpful || b.rating - a.rating)
    ?.slice(0, 9);

  if (reviewsLoading) {
    return <TestimonialLoadingSkeleton />;
  }

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <Stack spacing={1} sx={{ mb: 4 }} alignItems={{ xs: 'center', md: 'unset' }}>
          <Typography 
            variant="h2"
            sx={{
              background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Discover why customers love shopping with us
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Carousel
          carousel={carousel}
          onMouseEnter={() => autoplayPlugin.stop()}
          onMouseLeave={() => autoplayPlugin.play()}
          sx={{
            '& .embla__container': {
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        >
          {topReviews?.map((review, index) => (
            <Box
              key={review.id}
              sx={{
                px: 1.5,
                py: 1,
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
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: 2,
                  ...bgGradient({
                    direction: '135deg',
                    startColor: theme.palette.background.neutral,
                    endColor: theme.palette.background.default,
                  }),
                  transition: theme.transitions.create(['box-shadow', 'transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  ...(hoveredIndex === index && {
                    boxShadow: theme.customShadows.z24,
                  }),
                }}
              >
                <Stack spacing={2}>
                  {/* Rating */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:star-bold" sx={{ color: 'warning.main' }} />
                    <Typography variant="subtitle2">{review.rating}/5</Typography>
                  </Stack>

                  {/* Review Content */}
                  <Typography
                    variant="body2"
                    sx={{
                      minHeight: 48,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    "{review.comment}"
                  </Typography>

                  {/* Customer Info */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      component="img"
                      src={review.avatarUrl || '/assets/images/avatars/avatar_default.jpg'}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle2">{review.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Verified Purchase
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Helpful Count */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Iconify icon="solar:like-bold" width={16} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {review.helpful} found this helpful
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Box>
          ))}
        </Carousel>

        {isMdUp && (
          <CarouselArrowBasicButtons
            options={carousel.options}
            disablePrev={carousel.arrows.disablePrev}
            disableNext={carousel.arrows.disableNext}
            onClickPrev={carousel.arrows.onClickPrev}
            onClickNext={carousel.arrows.onClickNext}
            sx={{ 
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </Box>
    </Container>
  );
}

// Loading Skeleton Component
function TestimonialLoadingSkeleton() {
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');
  const slidesToShow = isMdUp ? 3 : isSmUp ? 2 : 1;

  return (
    <Container sx={{ py: { xs: 5, md: 10 } }}>
      <Stack spacing={3}>
        <Stack spacing={2} alignItems="center">
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={200} height={20} />
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
            <Card key={index} sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width={40} />
                </Stack>
                <Skeleton variant="text" height={60} />
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Stack spacing={1}>
                    <Skeleton variant="text" width={100} />
                    <Skeleton variant="text" width={80} />
                  </Stack>
                </Stack>
                <Skeleton variant="text" width={120} />
              </Stack>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}