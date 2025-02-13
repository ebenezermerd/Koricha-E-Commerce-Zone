import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Skeleton } from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { bgGradient } from 'src/utils/cssStyles';
import { useCarousel, Carousel, CarouselDotButtons } from 'src/components/carousel';
import { EcommerceProductItemHero } from '../product/item';
import { CarouselArrowBasicButtons } from 'src/components/carousel/components/carousel-arrow-buttons';

const HERO_TITLES = [
  'New Collection 2024',
  'Best Sellers of the Month',
  'Exclusive Limited Edition',
  'Special Holiday Offers',
];

export default function EcommerceLandingHero() {
  const theme = useTheme();
  const { products, productsLoading } = useGetProducts();

  const heroProducts = products
    ?.filter(product => product.rating >= 4 || product.inStock > 0)
    .slice(0, 4)
    .map((product, index) => ({
      id: product.id,
      title: `${HERO_TITLES[index]} - ${product.name}`,
      caption: product.caption || product.subDescription || product.description.slice(0, 120),
      coverImg: product.coverImg,
      path: `/products/${product.id}`,
      label: product.label || (product.priceSale > 0 ? 'Sale' : 'New'),
    }));

  const carousel = useCarousel({
    slidesToShow: 1,
    loop: heroProducts.length > 1,
    direction: 'ltr',
    axis: 'x',
    slideSpacing: '0px',
    containScroll: 'trimSnaps',
  });

  console.log('Products:', products);
  console.log('Hero Products:', heroProducts);

  if (productsLoading) {
    return (
      <Container sx={{ pt: { xs: 5, md: 8 } }}>
        <Skeleton variant="rectangular" height={500} />
      </Container>
    );
  }

  if (!products?.length || !heroProducts?.length) {
    return null;
  }
  

  return (
    <Container sx={{ pt: { xs: 5, md: 8 }, minHeight: 500 }}>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_1.jpg',
          }),
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
        }}
      >
        <Carousel carousel={carousel}>
          {heroProducts.map((product) => (
            <EcommerceProductItemHero key={product.id} product={product} />
          ))}
        </Carousel>

        <CarouselDotButtons
          onClickDot={carousel.dots.onClickDot}
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          variant="rounded"
          sx={{
            right: 20,
            bottom: 20,
            position: 'absolute',
            color: 'primary.main',
          }}
        />

        <CarouselArrowBasicButtons
          onClickPrev={carousel.arrows.onClickPrev}
          onClickNext={carousel.arrows.onClickNext}
          disablePrev={carousel.arrows.disablePrev}
          disableNext={carousel.arrows.disableNext}
          sx={{
            right: { xs: 'auto', md: 40 },
            left: { xs: 'auto', md: 'unset' },
            bottom: 40,
            gap: 2,
            position: 'absolute',
          }}
        />
      </Box>
    </Container>
  );
}