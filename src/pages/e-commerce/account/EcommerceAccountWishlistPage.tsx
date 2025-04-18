import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceAccountWishlistView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function EcommerceAccountWishlistPage() {
  return (
    <>
      <Helmet>
        <title>Account: Wishlist | Korecha</title>
      </Helmet>

      <EcommerceAccountWishlistView />
    </>
  );
}
