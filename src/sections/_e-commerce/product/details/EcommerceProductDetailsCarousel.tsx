// src/pages/EcommerceProductDetailsCarousel.js

import React, { useState, useEffect } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
// components
import Image from 'src/components/image';
import  { Carousel, CarouselArrowBasicButtons } from 'src/components/carousel';
import Lightbox from 'src/components/lightbox';
// hooks
import { useCarousel } from 'src/components/carousel';
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

  // Initialize carousels
  const largeImageCarousel = useCarousel(
    { loop: true },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  const thumbnailsCarousel = useCarousel({
    align: 'center',
    dragFree: true,
    // Other Embla options
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
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Box sx={{ mb: 3, borderRadius: 3, overflow: 'hidden', position: 'relative', bgcolor: 'background.neutral' }}>
          <CarouselArrowBasicButtons
            options={largeImageCarousel.options}
            disablePrev={largeImageCarousel.arrows.disablePrev}
            disableNext={largeImageCarousel.arrows.disableNext}
            onClickPrev={largeImageCarousel.arrows.onClickPrev}
            onClickNext={largeImageCarousel.arrows.onClickNext}
          >
            <Carousel carousel={largeImageCarousel}>
              {slides.map((slide, index) => (
                <Image
                  key={slide.src}
                  alt="product"
                  src={slide.src}
                  ratio="1/1"
                  onClick={() => handleOpenLightbox(index)}
                  sx={{ cursor: 'zoom-in' }}
                />
              ))}
            </Carousel>
          </CarouselArrowBasicButtons>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <StyledThumbnailsContainer>
          <Carousel carousel={thumbnailsCarousel}>
            {slides.map((slide, index) => (
              <Image
                key={slide.src}
                alt="thumbnail"
                src={slide.src}
                sx={{
                  
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  
                }}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </Carousel>
        </StyledThumbnailsContainer>
      </Grid>
      <Lightbox
        index={selectedImageIndex}
        slides={slides}
        open={isLightboxOpen}
        close={handleLightboxClose}
        onGetCurrentIndex={handleLightboxChange}
      />
    </Grid>
  );
}