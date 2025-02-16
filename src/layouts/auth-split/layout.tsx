import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { styled, alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

import  Logo  from 'src/components/logo';

import { Section } from './section';
import { Main, Content } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import SettingsDrawer from 'src/components/settings/drawer';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

export function AuthSplitLayout({ sx, section, children, header }: AuthSplitLayoutProps) {
  const layoutQuery: Breakpoint = 'md';
  const theme = useTheme();


  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          sx={{
            position: { [layoutQuery]: 'fixed', },
            bgcolor: theme.palette.background.neutral,
            color: theme.palette.text.primary,
            boxShadow: 'none',
            px: 2,
            borderRadius: '5px',
            borderBottom: `1px solid ${theme.palette.divider}`,
          
            ...header?.sx
          }}
          slotProps={{ container: { maxWidth: false } }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                {/* -- Help link -- */}
                <Link
                  href={paths.support}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
                {/* -- Settings button -- */}
                <SettingsDrawer />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '620px' }}
      sx={sx}
    >
      <Main layoutQuery={layoutQuery} sx={{ mt: '20px' }}>
        <Section
          title={section?.title}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          method={CONFIG.auth.method}
          subtitle={section?.subtitle}
          methods={[
            {
              label: 'Jwt',
              path: paths.auth.jwt.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-jwt.svg`,
            },
          ]}
        />
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
