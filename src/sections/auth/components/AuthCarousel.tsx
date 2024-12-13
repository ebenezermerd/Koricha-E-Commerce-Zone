// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import { useCarousel, CarouselDotButtons, Carousel, CarouselOptions } from 'src/components/carousel';
// plugins
import Autoplay from 'embla-carousel-autoplay';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    width: 1,
    flexGrow: 1,
    display: 'block',
    position: 'relative',
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type AuthCarouselProps = {
  title: string;
  images: string[];
};

export default function AuthCarousel({ title, images }: AuthCarouselProps) {
  const theme = useTheme();

  const carouselOptions: CarouselOptions = {
    slidesToShow: 1,
    slideSpacing: '16px',
    // other valid options
  };

  const carousel = useCarousel(carouselOptions, [Autoplay({ delay: 5000 })]);

  return (
    <StyledRoot>
      <StyledOverlay />

      <Typography
        variant="h2"
        sx={{
          p: 10,
          width: 1,
          left: 0,
          bottom: 80,
          zIndex: 10,
          textAlign: 'center',
          position: 'absolute',
          color: 'common.white',
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </Typography>

      <Carousel carousel={carousel}>
        {images.map((img) => (
          <Box key={img}>
            <Image alt={img} src={img} sx={{ width: 1, height: '100vh' }} />
          </Box>
        ))}
      </Carousel>

      <CarouselDotButtons
        //dotCount={carousel.dots.dotCount}
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          left: 0,
          right: 0,
          zIndex: 9,
          bottom: 80,
          mx: 'auto',
          position: 'absolute',
        }}
      />
    </StyledRoot>
  );
}