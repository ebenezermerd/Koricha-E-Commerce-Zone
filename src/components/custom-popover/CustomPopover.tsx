import { styled, alpha } from '@mui/material/styles';
import { Popover, PopoverProps } from '@mui/material';

// ----------------------------------------------------------------------

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    marginTop: 8,
    marginLeft: 16,
    padding: theme.spacing(1),
    boxShadow: theme.customShadows.dropdown,
    borderRadius: theme.shape.borderRadius * 1.5,
    border: `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
  },
}));

export default function CustomPopover({ children, sx, ...other }: PopoverProps) {
  return (
    <StyledPopover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx,
      }}
      {...other}
    >
      {children}
    </StyledPopover>
  );
} 