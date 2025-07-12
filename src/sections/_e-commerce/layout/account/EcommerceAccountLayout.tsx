import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
//
import EcommerceHeader from 'src/layouts/main/header/Header';
import EcommerceAccountMenu from './EcommerceAccountMenu';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function EcommerceAccountLayout({ children }: Props) {
  const isMdUp = useResponsive('up', 'md');

  const [menuOpen, setMemuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMemuOpen(true);
  };

  const handleMenuClose = () => {
    setMemuOpen(false);
  };

  return (
    <>
      <EcommerceHeader />

      {isMdUp ? (
        <Container 
          maxWidth="xl"
          sx={{ 
            my: 3,
            px: { xs: 2, md: 4 }
          }}
        >
          <Typography variant="h3">Account</Typography>
        </Container>
      ) : (
        <Box sx={{ py: 2, mb: 3, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
          <Container maxWidth="xl">
            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon="carbon:menu" />}
              onClick={handleMenuOpen}
            >
              Account
            </Button>
          </Container>
        </Box>
      )}

      <Container 
        maxWidth="xl"
        sx={{
          px: { xs: 2, md: 4 }
        }}
      >
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          spacing={3}
          sx={{
            mb: {
              xs: 5,
              md: 8,
            },
          }}
        >
          <EcommerceAccountMenu open={menuOpen} onClose={handleMenuClose} />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 4 },
              width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
              overflow: 'auto',
            }}
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
