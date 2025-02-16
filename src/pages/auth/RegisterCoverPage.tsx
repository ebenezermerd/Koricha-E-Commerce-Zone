import { Helmet } from 'react-helmet-async';
// components
import { RegisterCoverView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function RegisterCoverPage() {
  return (
    <>
      <Helmet>
        <title>Register Cover |Korecha</title>
      </Helmet>

      <RegisterCoverView />
    </>
  );
}
