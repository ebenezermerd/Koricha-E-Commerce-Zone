import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceCompareView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function EcommerceComparePage() {
  return (
    <>
      <Helmet>
        <title>Compare | Korecha</title>
      </Helmet>

      <EcommerceCompareView />
    </>
  );
}
