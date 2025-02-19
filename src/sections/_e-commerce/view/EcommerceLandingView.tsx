// _mock
import { _testimonials } from 'src/_mock';
//
import { useTranslate } from 'src/locales';
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

// ----------------------------------------------------------------------

export default function EcommerceLandingView() {
  const { t } = useTranslate('landing');

  return (
    <>
      <EcommerceHeader />

      <EcommerceLandingHero />

      <EcommerceLandingCategories />

      <EcommerceLandingHotDealToday />

      <EcommerceLandingFeaturedProducts />

      {/* <TestimonialEcommerce /> */}

      <EcommerceLandingSpecialOffer />

      <EcommerceLandingFeaturedBrands />

      <EcommerceLandingPopularProducts />

      <EcommerceLandingTopProducts />
    </>
  );
}
