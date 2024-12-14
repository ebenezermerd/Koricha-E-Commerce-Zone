import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtUpdatePasswordView } from 'src/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Update password | jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtUpdatePasswordView />
    </>
  );
}
