import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Link,
  Stack,
  Drawer,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useActiveLink from 'src/hooks/useActiveLink';
// config
import { NAV } from 'src/config-global';
// routes
import { paths } from 'src/routes/paths';
// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import { signOut } from 'src/auth/context/jwt/action';
import { useGetUser, updateUser } from 'src/services/useUser';
import LoadingScreen from 'src/components/loading-screen';
import { toast } from 'src/components/snackbar';
import { useProfileImage } from 'src/hooks/use-profile-image';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Personal Info',
    path: paths.eCommerce.account.personal,
    icon: <Iconify icon="carbon:user" />,
  },
  {
    title: 'Wishlist',
    path: paths.eCommerce.account.wishlist,
    icon: <Iconify icon="carbon:favorite" />,
  },
  {
    title: 'Orders',
    path: paths.eCommerce.account.orders,
    icon: <Iconify icon="carbon:document" />,
  },
  {
    title: 'Address Book',
    path: paths.eCommerce.account.address,
    icon: <Iconify icon="carbon:purchase" />,
  },
];

// ----------------------------------------------------------------------

const StyledUploadButton = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': { opacity: 0.72 },
  typography: theme.typography.caption,
}));

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function EcommerceAccountMenu({ open, onClose }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { user, userLoading, revalidateUser } = useGetUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { setPendingImage } = useProfileImage();

  useEffect(() => {
    if (user?.avatarUrl) {
      setPreviewUrl(user.avatarUrl);
    }
  }, [user?.avatarUrl]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate(paths.auth.jwt.signIn);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // File size validation (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should not exceed 2MB');
        return;
      }

      // File type validation
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Create preview URL immediately
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Store the file in context instead of sending immediately
      setPendingImage(file);
      toast.success('Image selected. Save your profile to apply changes.');
    } catch (error) {
      console.error('Error handling profile photo:', error);
      toast.error('Failed to handle profile photo');
      setPreviewUrl(user?.avatarUrl || null);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Wait for user data to load
  if (userLoading || !user) {
    return <LoadingScreen />;
  }

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(isMdUp && {
          width: NAV.W_DRAWER,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar 
            src={previewUrl || user?.avatarUrl} 
            sx={{ width: 64, height: 64 }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <StyledUploadButton
            onClick={handleAvatarClick}
            sx={{
              ...(isMdUp && {
                flexShrink: 0,
                width: 'auto',
              }),
            }}
          >
            <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
            Change photo
          </StyledUploadButton>
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {`${user.firstName} ${user.lastName}`}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {user.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,  
          }}
        >
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_DRAWER,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type MenuItemProps = {
  item: {
    title: string;
    path: string;
    icon: React.ReactNode;
  };
};

function MenuItem({ item }: MenuItemProps) {
  const { active } = useActiveLink(item.path);

  return (
    <Link
      component={RouterLink}
      key={item.title}
      to={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}
