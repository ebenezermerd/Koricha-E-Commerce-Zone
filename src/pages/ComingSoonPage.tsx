import { Helmet } from 'react-helmet-async';
// sections
import { ComingSoonView } from 'src/sections/status/view';

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  return (
    <>
      <Helmet>
        <title>Coming Soon | Korecha</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
