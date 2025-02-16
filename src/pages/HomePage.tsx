import { Helmet } from 'react-helmet-async';
// sections
import { EcommerceLandingView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Landing | Korecha</title>
      </Helmet>

      <EcommerceLandingView />
    </>
  );
}
