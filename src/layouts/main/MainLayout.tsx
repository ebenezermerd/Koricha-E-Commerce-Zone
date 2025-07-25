import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// config
import { HEADER } from 'src/config-global';
//
import Header from './header/Header';
import Footer from './footer/Footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career/landing', '/travel/landing'];

const spacingLayout = [...pathsOnDark, '/', '/e-learning/landing', '/marketing/landing'];

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const actionPage = (arr: string[]) => arr.some((path) => pathname === path);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%'
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP },
      }}
    />
  );
}
