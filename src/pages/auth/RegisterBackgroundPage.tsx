import { Helmet } from 'react-helmet-async';
// sections
import { RegisterBackgroundView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function RegisterBackgroundPage() {
  return (
    <>
      <Helmet>
        <title>Register Background |Korecha</title>
      </Helmet>

      <RegisterBackgroundView />
    </>
  );
}
