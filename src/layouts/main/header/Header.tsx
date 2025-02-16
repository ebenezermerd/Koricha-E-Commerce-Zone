import { useState, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Stack,
  Badge,
  Container,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Box,
  Link,
} from "@mui/material";

// hooks
import useResponsive from "src/hooks/useResponsive";
import useOffSetTop from "src/hooks/useOffSetTop";
// utils
import { bgGradient, bgBlur } from "src/utils/cssStyles";

// routes
import { paths } from "src/routes/paths";
// config
import { HEADER } from "src/config-global";
// components
import {
  MegaMenuDesktopHorizon,
  MegaMenuMobile,
} from "src/components/mega-menu";
import Iconify from "src/components/iconify";
import Logo from "src/components/logo";
import Label from "src/components/label";
import SettingsDrawer from "src/components/settings/drawer";
import HeaderShadow from "../../components/HeaderShadow";
//
import Searchbar from "../../components/Searchbar";
import { data } from "./config-navigation";

import { NavMobile, NavDesktop, navConfig } from "../nav";

import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { useCart } from 'src/contexts/cart-context';
import { useWishlist } from 'src/contexts/wishlist-context';
import { LanguagePopover } from 'src/components/language-popover';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: "/assets/background/overlay_1.jpg",
  }),
}));

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { t } = useTranslate('common');
  const { authenticated } = useAuthContext();
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  const isMdUp = useResponsive("up", "md");
  const isOffset = useOffSetTop();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  // Calculate total items in cart
  const cartItemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  // Calculate total items in wishlist
  const wishlistItemCount = wishlistState.items.length;

  return (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: "none",
        bgcolor: theme.palette.background.neutral,
        borderRadius: "5px"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          mx: { xs: 2, md: 10 },

          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(["height", "background-color"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),

          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: "text.primary",
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: "flex", alignItems: "center" }}>
          <Box sx={{ lineHeight: 0, position: "relative", mr: 6 }}>
            <Logo />
            <Link
              href="https://zone-docs.vercel.app/changelog"
              target="_blank"
              rel="noopener"
            >
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: 5,
                  right: 10,
                  height: 20,
                  fontSize: 11,
                  cursor: "pointer",
                  position: "absolute",
                }}
              >
                v1.0
              </Label>
            </Link>
          </Box>

          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              component={RouterLink}
              to={paths.eCommerce.landing}
              color="inherit"
            >
              {t('home')}
            </Button>
            <Button
              component={RouterLink}
              to={paths.eCommerce.products}
              color="inherit"
            >
              {t('products')}
            </Button>
            <Button
              component={RouterLink}
              to={paths.support}
              color="inherit"
            >
              {t('support')}
            </Button>
            {/* <Box sx={{ px: "20px" }}>
              {isMdUp ? (
                <MegaMenuDesktopHorizon data={data} />
              ) : (
                openMenuMobile && (
                  <MegaMenuMobile
                    data={data}
                    open={openMenuMobile}
                    onOpen={() => setOpenMenuMobile(true)}
                    onClose={() => setOpenMenuMobile(false)}
                    action={
                      <Button
                        color="inherit"
                        onClick={() => setOpenMenuMobile(true)}
                      >
                        {t('categories')}
                      </Button>
                    }
                  />
                )
              )}
            </Box> */}
            <Stack spacing={1} direction="row" alignItems="center">
              <Searchbar />
              <LanguagePopover />
              <SettingsDrawer />
            </Stack>
            <Badge badgeContent={wishlistItemCount} color="info">
              <IconButton
                component={RouterLink}
                to={paths.eCommerce.wishlist}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:favorite" width={24} />
              </IconButton>
            </Badge>
            <Badge badgeContent={cartItemCount} color="error">
              <IconButton
                component={RouterLink}
                to={paths.eCommerce.cart}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:shopping-cart" width={24} />
              </IconButton>
            </Badge>
            {authenticated ? (
              <IconButton
                component={RouterLink}
                to={paths.eCommerce.account.personal}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:user-avatar" width={24} />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                component={RouterLink}
                to={paths.auth.jwt.signIn}
              >
                {t('signIn')}
              </Button>
            )}
          </Stack>

          {!isMdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}
