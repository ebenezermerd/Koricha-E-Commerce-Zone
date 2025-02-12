import { Toaster } from 'sonner';
import { styled, keyframes } from '@mui/material/styles';
import { varAlpha } from 'src/theme/styles';
import { toasterClasses } from './classes';
import { alpha } from '@mui/material/styles';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

// ----------------------------------------------------------------------

export const StyledToaster = styled(Toaster)(({ theme }) => {
  const baseStyles = {
    toastDefault: {
      padding: theme.spacing(1.5),
      boxShadow: theme.customShadows.z16,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      animation: `${slideIn} 0.3s ease-out`,
      '&[data-removed="true"]': {
        animation: `${slideOut} 0.3s ease-out`,
      },
    },
    toastColor: {
      padding: theme.spacing(1.5),
      boxShadow: theme.customShadows.z16,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
    },
  };

  return {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    left: 'auto',
    zIndex: theme.zIndex.snackbar,
    
    [`& .${toasterClasses.toast}`]: {
      gap: 12,
      width: 320,
      minHeight: 64,
      position: 'relative',
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
      alignItems: 'center',
      transition: theme.transitions.create(['transform', 'opacity']),
    },

    [`& .${toasterClasses.progressBar}`]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 3,
      transformOrigin: 'left',
      backgroundColor: 'rgba(0,0,0,0.1)',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformOrigin: 'left',
        animation: '5s linear forwards progress',
      },
    },

    '@keyframes progress': {
      '0%': { transform: 'scaleX(1)' },
      '100%': { transform: 'scaleX(0)' },
    },

    [`& .${toasterClasses.content}`]: {
      gap: 4,
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    [`& .${toasterClasses.title}`]: {
      fontSize: theme.typography.subtitle2.fontSize,
      fontWeight: theme.typography.subtitle2.fontWeight,
    },

    [`& .${toasterClasses.description}`]: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.secondary,
    },

    [`& .${toasterClasses.closeButton}`]: {
      top: theme.spacing(1),
      right: theme.spacing(1),
      width: 20,
      height: 20,
      padding: 0,
      position: 'absolute',
      color: theme.palette.grey[500],
      '&:hover': {
        color: theme.palette.grey[800],
      },
    },

    [`& .${toasterClasses.icon}`]: {
      width: 40,
      height: 40,
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      borderRadius: '50%',
      justifyContent: 'center',
      marginRight: theme.spacing(1.5),
    },

    // Toast variants
    [`& .${toasterClasses.success}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        color: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.08),
      },
      [`& .${toasterClasses.progressBar}::after`]: {
        backgroundColor: theme.palette.success.main,
      },
    },

    [`& .${toasterClasses.error}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.08),
      },
      [`& .${toasterClasses.progressBar}::after`]: {
        backgroundColor: theme.palette.error.main,
      },
    },

    [`& .${toasterClasses.warning}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        color: theme.palette.warning.main,
        backgroundColor: alpha(theme.palette.warning.main, 0.08),
      },
      [`& .${toasterClasses.progressBar}::after`]: {
        backgroundColor: theme.palette.warning.main,
      },
    },

    [`& .${toasterClasses.info}`]: {
      ...baseStyles.toastColor,
      [`& .${toasterClasses.icon}`]: {
        color: theme.palette.info.main,
        backgroundColor: alpha(theme.palette.info.main, 0.08),
      },
      [`& .${toasterClasses.progressBar}::after`]: {
        backgroundColor: theme.palette.info.main,
      },
    },
  };
});
