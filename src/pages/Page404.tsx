import { Helmet } from 'react-helmet-async';
// sections
import { Error404View } from 'src/sections/error/view';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Korecha</title>
      </Helmet>

      <Error404View />
    </>
  );
}
