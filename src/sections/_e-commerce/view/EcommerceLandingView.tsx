// _mock
import { _testimonials } from 'src/_mock';
//
import { useTranslate } from 'src/locales';
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

// ----------------------------------------------------------------------

export default function EcommerceLandingView() {
  const { t } = useTranslate('landing');

  return (
    <>
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
