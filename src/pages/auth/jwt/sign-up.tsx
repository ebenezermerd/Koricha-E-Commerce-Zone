import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CustomerSignUpView } from 'src/auth/view/registration-view';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CustomerSignUpView />
    </>
  );
}
