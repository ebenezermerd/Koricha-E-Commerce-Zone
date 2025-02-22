import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceProductView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function EcommerceProductPage() {
  return (
    <>
      <Helmet>
        <title>Product Details | Korecha</title>
      </Helmet>

      <EcommerceProductView />
    </>
  );
}
