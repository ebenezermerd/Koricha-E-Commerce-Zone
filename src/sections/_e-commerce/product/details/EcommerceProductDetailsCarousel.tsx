// src/pages/EcommerceProductDetailsCarousel.js

import React, { useState, useEffect } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
// components
import Image from 'src/components/image';
import  { 
  Carousel, 
  useCarousel,
  CarouselThumb,
  CarouselThumbs, 
  CarouselArrowBasicButtons } from 'src/components/carousel';

import Lightbox from 'src/components/lightbox';
// hooks
// plugins
import  Autoplay  from 'embla-carousel-autoplay';
// utils
import { bgGradient } from 'src/utils/cssStyles';

// Styled components
const StyledThumbnailsContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  position: 'relative',
  // Add responsive styling based on the number of thumbnails
  // ...
}));

type Props = {
  images: string[];
};

export default function EcommerceProductDetailsCarousel({ images }: Props) {
  const theme = useTheme();
  const slides = images.map((src) => ({ src }));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const carousel = useCarousel({
    loop: true,
    startIndex: 0,
    containScroll: 'keepSnaps',
    slidesToShow: 1,
    thumbs: {
      containScroll: 'keepSnaps',
      dragFree: true,
      slideSpacing: '8px',
      slidesToShow: 'auto',
    },
  });
  // Initialize carousels
  const largeImageCarousel = useCarousel(
    { loop: true },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  const thumbnailsCarousel = useCarousel({
    align: 'center',
    dragFree: true,
    
  });

  

  // Event handlers
  const handleLargeImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    thumbnailsCarousel.mainApi?.scrollTo(index);
  };

  const handleThumbnailsSelect = (index: number) => {
    setSelectedImageIndex(index);
    largeImageCarousel.mainApi?.scrollTo(index);
  };

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxChange = (newIndex: number) => {
    setSelectedImageIndex(newIndex);
  };

  // Synchronize carousels and lightbox
  useEffect(() => {
    if (largeImageCarousel.mainApi) {
      largeImageCarousel.mainApi.on('select', () => {
        if (largeImageCarousel.mainApi) {
          const selectedIndex = largeImageCarousel.mainApi.selectedScrollSnap();
          handleLargeImageSelect(selectedIndex);
        }
      });
    }
  }, [largeImageCarousel.mainApi, thumbnailsCarousel.mainApi]);

  useEffect(() => {
    if (thumbnailsCarousel.mainApi) {
      thumbnailsCarousel.mainApi.on('select', () => {
        if (thumbnailsCarousel.mainApi) {
          const selectedIndex = thumbnailsCarousel.mainApi.selectedScrollSnap();
          handleThumbnailsSelect(selectedIndex);
        }
      });
    }
  }, [thumbnailsCarousel.mainApi, largeImageCarousel.mainApi]);

  useEffect(() => {
    if (!isLightboxOpen) {
      largeImageCarousel.mainApi?.scrollTo(selectedImageIndex);
    }
  }, [isLightboxOpen, selectedImageIndex, largeImageCarousel.mainApi]);

  // Render carousels and lightbox
  return (
    <Grid container spacing={1} alignItems="center">
      
      <Grid item xs={12}>
        <StyledThumbnailsContainer>
          <Carousel carousel={thumbnailsCarousel}>
            {slides.map((slide, index) => (
              <Image
                key={slide.src}
                alt="thumbnail"
                src={slide.src}
                
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </Carousel>
        </StyledThumbnailsContainer>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative', bgcolor: 'background.neutral' }}>
          <CarouselArrowBasicButtons
              {...carousel.arrows}
              onClickPrev={carousel.arrows.onClickPrev}
              onClickNext={carousel.arrows.onClickNext}
              sx={{
                '& .arrow-btn': {
                  opacity: 0.48,
                  color: 'common.white',
                  bgcolor: 'grey.900',
                  '&:hover': {
                    opacity: 1,
                    bgcolor: 'grey.900',
                  },
                },
              }}
          >
            <CarouselThumbs
          ref={carousel.thumbs.thumbsRef}
          options={carousel.options?.thumbs}
          sx={{ 
            maxWidth: 540,
            mx: 'auto',
            mt: 2
          }}
        >
          {slides.map((item, index) => (
            <CarouselThumb
              key={item.src}
              src={item.src}
              index={index}
              selected={index === carousel.thumbs.selectedIndex}
              onClick={() => carousel.thumbs.onClickThumb(index)}
            />
          ))}
        </CarouselThumbs>
          </CarouselArrowBasicButtons>
        </Box>
      </Grid>
      <Lightbox
        index={selectedImageIndex}
        slides={slides}
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        onGetCurrentIndex={(index) => setSelectedImageIndex(index)}
      />
    </Grid>
  );
}