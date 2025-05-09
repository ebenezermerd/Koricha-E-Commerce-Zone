import { Helmet } from 'react-helmet-async';
// sections
import { ResetPasswordView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Reset Password |Korecha</title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
