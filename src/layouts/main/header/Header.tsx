import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, LinkProps } from "react-router-dom";
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuItemProps,
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

interface StyledMenuItemProps extends MenuItemProps {
  active: boolean;
  component?: React.ElementType;
  to?: string;
  onClick?: () => void;
}

const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>(({ theme, active }) => ({
  margin: '4px 8px',
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  ...(active && {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  }),
}));

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslate('common');
  const { authenticated, user } = useAuthContext();
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  const isMdUp = useResponsive("up", "md");
  const isOffset = useOffSetTop();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Calculate total items in cart
  const cartItemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  // Calculate total items in wishlist
  const wishlistItemCount = wishlistState.items.length;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  const menuItems = [
    { path: paths.eCommerce.landing, label: 'home', icon: 'eva:home-fill' },
    { path: paths.eCommerce.products, label: 'products', icon: 'eva:shopping-bag-fill' },
    { path: paths.support, label: 'support', icon: 'eva:question-mark-circle-fill' },
    { path: paths.eCommerce.wishlist, label: 'wishlist', icon: 'eva:heart-fill', badge: wishlistItemCount },
    { path: paths.eCommerce.cart, label: 'cart', icon: 'eva:shopping-cart-fill', badge: cartItemCount },
  ];

  return (
    <AppBar
      color="transparent"
      sx={{
        bgcolor: theme.palette.background.neutral,
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        width: '100%',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, md: 3 },
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
        <Container maxWidth="xl" sx={{ height: 1, display: "flex", alignItems: "center" }}>
          <Box sx={{ lineHeight: 0, position: "relative", mr: 6 }}>
            <Logo />
          </Box>

          {isMdUp ? (
            // Desktop view
            <Stack
              spacing={2}
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              {menuItems.slice(0, 3).map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  color={isActiveRoute(item.path) ? "primary" : "inherit"}
                >
                  {t(item.label)}
                </Button>
              ))}
              
              <Stack spacing={1} direction="row" alignItems="center">
                <Searchbar />
                <LanguagePopover />
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
                  {user?.avatarUrl ? (
                    <Box
                      component="img"
                      src={user.avatarUrl}
                      alt="user avatar"
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                  ) : (
                    <Iconify icon="mdi:account-circle" width={34} />
                  )}
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={paths.auth.jwt.signIn}
                >
                  {t('signIn')}
                </Button>
              )}
            </Stack>
          ) : (
            // Mobile view
            <Stack
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={1}
            >
              <Searchbar />
              <LanguagePopover />
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                size="small"
              >
                <Iconify icon="eva:menu-2-fill" width={20} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    width: 260,
                    maxWidth: '100%',
                    mt: 1.5,
                    pb: 1,
                  }
                }}
              >
                {menuItems.map((item) => (
                  <StyledMenuItem
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleMenuClose}
                    active={isActiveRoute(item.path)}
                  >
                    <ListItemIcon>
                      <Iconify icon={item.icon} width={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t(item.label)}
                      primaryTypographyProps={{ fontSize: '0.875rem' }}
                    />
                    {item.badge && item.badge > 0 && (
                      <Label color={item.label === 'cart' ? 'error' : 'info'} sx={{ fontSize: '0.75rem' }}>
                        {item.badge}
                      </Label>
                    )}
                  </StyledMenuItem>
                ))}
                
                <Divider sx={{ my: 1 }} />
                
                {authenticated ? (
                  <StyledMenuItem
                    component={RouterLink}
                    to={paths.eCommerce.account.personal}
                    onClick={handleMenuClose}
                    active={isActiveRoute(paths.eCommerce.account.personal)}
                  >
                    <ListItemIcon>
                      {user?.avatarUrl ? (
                        <Box
                          component="img"
                          src={user.avatarUrl}
                          alt="user avatar"
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <Iconify icon="mdi:account-circle" width={20} />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('account')}
                      primaryTypographyProps={{ fontSize: '0.875rem' }}
                    />
                  </StyledMenuItem>
                ) : (
                  <StyledMenuItem
                    component={RouterLink}
                    to={paths.auth.jwt.signIn}
                    onClick={handleMenuClose}
                    active={isActiveRoute(paths.auth.jwt.signIn)}
                  >
                    <ListItemIcon>
                      <Iconify icon="eva:log-in-fill" width={20} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('signIn')}
                      primaryTypographyProps={{ fontSize: '0.875rem' }}
                    />
                  </StyledMenuItem>
                )}
              </Menu>
            </Stack>
          )}
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}
