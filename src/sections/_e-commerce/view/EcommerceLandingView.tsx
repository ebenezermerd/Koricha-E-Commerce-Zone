// _mock
import { _testimonials } from 'src/_mock';
//
import { useTranslate } from 'src/locales';
import { Container } from '@mui/material';
import TestimonialEcommerce from '../../testimonial/e-commerce';
import { EcommerceHeader } from '../layout';
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
