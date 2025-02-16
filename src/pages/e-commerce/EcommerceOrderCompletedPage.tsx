import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceOrderCompletedView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function EcommerceOrderCompletedPage() {
  return (
    <>
      <Helmet>
        <title>Order Completed | Korecha</title>
      </Helmet>

      <EcommerceOrderCompletedView />
    </>
  );
}
