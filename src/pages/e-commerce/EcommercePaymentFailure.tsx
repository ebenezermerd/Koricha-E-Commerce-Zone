import { Helmet } from 'react-helmet-async';
// sections
import PaymentFailedView from 'src/sections/_e-commerce/view/payment-failed-view';

// ----------------------------------------------------------------------

export default function EcommercePaymentFailurePage() {
  return (
    <>
      <Helmet>
        <title>Payment Failed | Korecha</title>
      </Helmet>

      <PaymentFailedView />
    </>
  );
}
