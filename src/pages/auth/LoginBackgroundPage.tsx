import { Helmet } from 'react-helmet-async';
// sections
import { LoginBackgroundView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function LoginBackgroundPage() {
  return (
    <>
      <Helmet>
        <title>Login Background |Korecha</title>
      </Helmet>

      <LoginBackgroundView />
    </>
  );
}
