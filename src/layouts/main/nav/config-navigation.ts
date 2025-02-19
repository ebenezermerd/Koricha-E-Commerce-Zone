// routes
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: paths.eCommerce.products },
  { title: 'Support', path: paths.support },
  { title: 'Wishlist', path: paths.eCommerce.wishlist },
  { title: 'Cart', path: paths.eCommerce.cart },
];
