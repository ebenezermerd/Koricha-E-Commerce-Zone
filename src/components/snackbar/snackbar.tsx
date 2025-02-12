import Portal from '@mui/material/Portal';

import Iconify from '../iconify';
import { StyledToaster } from './styles';
import { toasterClasses } from './classes';

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <Portal>
      <StyledToaster
        expand
        closeButton
        richColors
        duration={5000}
        position="top-right"
        className={toasterClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: toasterClasses.toast,
            title: toasterClasses.title,
            description: toasterClasses.description,
            icon: toasterClasses.icon,
            closeButton: toasterClasses.closeButton,
            actionButton: toasterClasses.actionButton,
            success: toasterClasses.success,
            error: toasterClasses.error,
            warning: toasterClasses.warning,
            info: toasterClasses.info,
          },
        }}
        icons={{
          success: <Iconify icon="solar:check-circle-bold" width={24} />,
          error: <Iconify icon="solar:danger-bold" width={24} />,
          warning: <Iconify icon="solar:danger-triangle-bold" width={24} />,
          info: <Iconify icon="solar:info-circle-bold" width={24} />,
        }}
      />
    </Portal>
  );
}
