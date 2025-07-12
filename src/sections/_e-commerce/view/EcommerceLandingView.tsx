// _mock
import { _testimonials } from 'src/_mock';
//
import { useTranslate } from 'src/locales';
import { Container } from '@mui/material';
import TestimonialEcommerce from '../../testimonial/e-commerce';
import {
  EcommerceLandingHero,
  EcommerceLandingCategories,
  EcommerceLandingTopProducts,
  EcommerceLandingHotDealToday,
  EcommerceLandingSpecialOffer,
  EcommerceLandingFeaturedBrands,
  EcommerceLandingPopularProducts,
  EcommerceLandingFeaturedProducts,
} from '../landing';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function EcommerceLandingView() {
  const { t } = useTranslate('landing');
  const { authenticated } = useAuthContext();

  return (
    <>
<<<<<<< HEAD
      <EcommerceLandingHero />
=======
      <EcommerceHeader />
      
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: '100vh',
          pt: {
            xs: authenticated ? '80px' : '64px',
            md: authenticated ? '9px' : '80px',
          },
          width: '100%',
        }}
      >
        <EcommerceLandingHero />

        <Container 
          maxWidth="xl" 
          sx={{ 
            width: '100%',
            px: { xs: 2, md: 3 },
            mx: 'auto',
          }}
        >
          <EcommerceLandingCategories />
>>>>>>> 0869ee7a8da398e58eee79d9be29a05664a62424

          <EcommerceLandingHotDealToday />

          <EcommerceLandingFeaturedProducts />

          {/* <TestimonialEcommerce /> */}

          <EcommerceLandingSpecialOffer />

          <EcommerceLandingFeaturedBrands />

          <EcommerceLandingPopularProducts />

          <EcommerceLandingTopProducts />
        </Container>
      </Container>
    </>
  );
}
