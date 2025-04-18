import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceAccountOrdersView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {
  return (
    <>
      <Helmet>
        <title>Account: Orders | Korecha</title>
      </Helmet>

      <EcommerceAccountOrdersView />
    </>
  );
}
