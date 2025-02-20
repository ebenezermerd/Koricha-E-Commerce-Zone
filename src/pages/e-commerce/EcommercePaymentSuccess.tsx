import { Helmet } from 'react-helmet-async';
// sections
import PaymentSuccessView from 'src/sections/_e-commerce/view/payment-success-view';

// ----------------------------------------------------------------------

export default function EcommercePaymentSuccessPage() {
  return (
    <>
      <Helmet>
        <title>Payment Success | Korecha</title>
      </Helmet>

      <PaymentSuccessView />
    </>
  );
}
