import { Helmet } from 'react-helmet-async';
// sections
import { MaintenanceView } from 'src/sections/status/view';

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Helmet>
        <title>Maintenance | Korecha</title>
      </Helmet>

      <MaintenanceView />
    </>
  );
}
