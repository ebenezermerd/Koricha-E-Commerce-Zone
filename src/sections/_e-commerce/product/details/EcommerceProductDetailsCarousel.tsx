// src/pages/EcommerceProductDetailsCarousel.js

import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';
// components
import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { useCarousel, Carousel } from 'src/components/carousel';
import { CarouselArrowBasicButtons } from 'src/components/carousel/components/carousel-arrow-buttons';
import { CarouselDotButtons } from 'src/components/carousel/components/carousel-dot-buttons';

type Props = {
  images: string[];
};

export default function EcommerceProductDetailsCarousel({ images }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Main carousel
  const carousel = useCarousel({
    slidesToShow: 1,
    loop: true,
  });

  // Watch for slide changes using the selectedIndex from dots
  useEffect(() => {
    setCurrentIndex(carousel.dots.selectedIndex);
  }, [carousel.dots.selectedIndex]);

  // Prepare slides for lightbox
  const slides = images.map((image) => ({
    src: image,
  }));

  const lightbox = useLightBox(slides);

  const handleOpenLightbox = (slideUrl: string) => {
    lightbox.onOpen(slideUrl);
  };

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', mb: 3  }}>
        <Carousel
          ref={carouselRef}
          carousel={carousel}
          slotProps={{
            container: { 
              sx: { borderRadius: 1, overflow: 'hidden'} 
            }
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleOpenLightbox(image)}
              sx={{
                width: '100%',
                height: { xs: 320, md: 480 },
                cursor: 'zoom-in',
                position: 'relative',
                '&:hover': {
                  '& .overlay': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: alpha(theme.palette.grey[900], 0.48),
                  opacity: 0,
                  transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shorter,
                  }),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9,
                }}
              >
                <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                  Click to zoom
                </Typography>
              </Box>

              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  overflow: 'hidden',
                }}
              />
            </Box>
          ))}
        </Carousel>

        <CarouselArrowBasicButtons
          {...carousel.arrows}
          sx={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '50%',
            transform: 'translateY(-50%)',
            px: 2,
            '& .arrow-button': {
              p: 0.5,
              width: 40,
              height: 40,
              opacity: 0.8,
              color: 'common.white',
              background: alpha(theme.palette.grey[900], 0.48),
              borderRadius: '50%',
              '&:hover': {
                opacity: 1,
                background: alpha(theme.palette.grey[900], 0.72),
              },
            },
          }}
        />
      </Box>

      {/* Custom thumbnail implementation to avoid CarouselThumbs component issues */}
      <Box sx={{ position: 'relative', mx: 'auto', maxWidth: 480, pb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            px: 2,
            py: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              component="button"
              onClick={() => carousel.dots.onClickDot(index)}
              sx={{
                p: 0,
                width: 80,
                height: 80,
                opacity: index === carousel.dots.selectedIndex ? 1 : 0.5,
                borderRadius: 1.5,
                cursor: 'pointer',
                position: 'relative',
                border: `2px solid ${index === carousel.dots.selectedIndex ? theme.palette.primary.main : 'transparent'}`,
                transition: theme.transitions.create(['opacity', 'border-color']),
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Image
                src={image}
                alt={`thumbnail-${index}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Stack spacing={2} sx={{ mt: 1 }}>
        <Typography variant="body2" align="center">
          {currentIndex + 1} of {images.length}
        </Typography>
      </Stack>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}