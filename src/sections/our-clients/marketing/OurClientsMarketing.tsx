// @mui
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
// types
import { IBrandProps } from 'src/types/brand';
// components
import SvgColor from 'src/components/svg-color';
import { useCarousel, Carousel, CarouselOptions } from 'src/components/carousel';
// plugins
import Autoplay from 'embla-carousel-autoplay';

type Props = {
  brands: IBrandProps[];
};

export default function OurClientsMarketing({ brands }: Props) {
  const theme = useTheme();

  // Define carousel options
  const carouselOptions: CarouselOptions = {
    loop: true,
    slidesToScroll: 2,
    axis: 'x',
    parallax: 0.24,
    breakpoints: {
      sm: { slidesToScroll: 4 },
      md: { slidesToScroll: 6 },
    },
  };

  // Initialize carousel with options and plugins
  const carousel = useCarousel(carouselOptions, [Autoplay({ delay: 5000 })]);

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >
      <Carousel carousel={carousel}>
        {brands.map((brand) => (
          <SvgColor
            key={brand.id}
            src={brand.image}
            sx={{ width: 106, height: 32, color: 'grey.500', opacity: 0.8 }}
          />
        ))}
      </Carousel>
    </Container>
  );
}