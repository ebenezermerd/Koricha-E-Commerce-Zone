// src/pages/EcommerceProductDetailsCarousel.js

import React, { useState } from 'react';
// @mui
import { Box, Button, Typography, Grid } from '@mui/material';
// components
import Image from 'src/components/image';
import Lightbox from 'src/components/lightbox';
import Iconify from 'src/components/iconify';

type Props = {
  images: string[];
};

export default function EcommerceProductDetailsCarousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    // Logic to open lightbox can be added here
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handlePrev} sx={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
            <Iconify icon="mdi:chevron-left" width={35} height={35} />
          </Button>
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              height: 'auto',
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Product Image ${currentIndex + 1}`}
              onClick={() => handleOpenLightbox(currentIndex)}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Box>
          <Button onClick={handleNext} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
            <Iconify icon="mdi:chevron-right" width={35} height={35} />
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          {currentIndex + 1} of {totalImages}
        </Typography>
      </Grid>
    
    </Grid>
  );
}