import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceCheckoutView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Checkout | Korecha</title>
      </Helmet>

      <EcommerceCheckoutView />
    </>
  );
}
