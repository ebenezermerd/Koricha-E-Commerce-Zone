import React, { useEffect, useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Skeleton } from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { bgGradient } from 'src/utils/cssStyles';
import { useCarousel, Carousel } from 'src/components/carousel';
import { EcommerceProductItemHero } from '../product/item';
import { CarouselArrowBasicButtons } from 'src/components/carousel/components/carousel-arrow-buttons';
import { IProductItemProps } from 'src/types/product';
// config
import { HEADER } from 'src/config-global';

export default function EcommerceLandingHero() {
  const theme = useTheme();
  const { products, productsLoading } = useGetProducts();
  const [heroHeight, setHeroHeight] = useState('calc(100vh - 88px)');

  // Update hero height based on screen size
  useEffect(() => {
    const updateHeroHeight = () => {
      const isMobile = window.innerWidth < theme.breakpoints.values.md;
      const headerHeight = isMobile ? HEADER.H_MOBILE : HEADER.H_MAIN_DESKTOP;
      setHeroHeight(`calc(100vh - ${headerHeight}px)`);
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeroHeight);
    };
  }, [theme.breakpoints.values.md]);

  const heroProducts = products
    ?.filter((product: IProductItemProps) => product.rating >= 4 || product.inStock > 0)
    .slice(0, 4)
    .map((product: IProductItemProps, index: number) => ({
      id: product.id,
      title: `${product.subDescription} - ${product.name}`,
      caption: product.caption || product.subDescription || product.description.slice(0, 120),
      coverImg: product.coverImg,
      path: `/products/${product.id}`,
      label: product.saleLabel.enabled ? product.saleLabel.content : (product.newLabel.enabled ? product.newLabel.content : 'New'),
    }));

  const carousel = useCarousel({
    slidesToShow: 1,
    loop: true,
    direction: 'ltr',
    axis: 'x',
  });

  if (productsLoading) {
    return (
      <Box sx={{ height: heroHeight, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton variant="rectangular" height="100%" width="100%" />
      </Box>
    );
  }

  if (!products?.length || !heroProducts?.length) {
    return null;
  }
  

  return (
    <Box sx={{ height: '100vh', width: '100%', border: '1px solid red', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          overflow: 'hidden',
          border: `1px solid ${theme.palette.primary.lighter}`,
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Carousel carousel={carousel}>
          {heroProducts.map((product: any) => (
            <EcommerceProductItemHero key={product.id} product={product} />
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
    </Box>
  );
}