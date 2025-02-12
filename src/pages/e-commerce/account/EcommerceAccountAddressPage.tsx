import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceAccountAddressView } from 'src/sections/_e-commerce/view/EcommerceAccountAddressView';

// ----------------------------------------------------------------------

export default function EcommerceAccountAddressPage() {
  return (
    <>
      <Helmet>
        <title>Account: Address Book | Koricha</title>
      </Helmet>

      <EcommerceAccountAddressView />
    </>
  );
}
