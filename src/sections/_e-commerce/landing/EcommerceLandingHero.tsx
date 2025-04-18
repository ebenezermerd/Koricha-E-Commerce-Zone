import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Skeleton } from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { bgGradient } from 'src/utils/cssStyles';
import { useCarousel, Carousel } from 'src/components/carousel';
import { EcommerceProductItemHero } from '../product/item';
import { CarouselArrowBasicButtons } from 'src/components/carousel/components/carousel-arrow-buttons';
import { IProductItemProps } from 'src/types/product';

export default function EcommerceLandingHero() {
  const theme = useTheme();
  const { products, productsLoading } = useGetProducts();

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
      <Container maxWidth="xl" disableGutters sx={{ pt: { xs: 5, md: 8 } }}>
        <Skeleton variant="rectangular" height="calc(100vh - 200px)" sx={{ minHeight: 500 }} />
      </Container>
    );
  }

  if (!products?.length || !heroProducts?.length) {
    return null;
  }
  

  return (
    <Container 
      maxWidth="xl" 
      disableGutters
      sx={{ 
        pt: { xs: 2, md: 4 },
        minHeight: { xs: 500, md: 'calc(100vh - 100px)' },
        width: '100%',
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${theme.palette.primary.lighter}`,
          position: 'relative',
          height: { xs: 500, md: 'calc(100vh - 200px)' },
          maxWidth: '100%',
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
    </Container>
  );
}