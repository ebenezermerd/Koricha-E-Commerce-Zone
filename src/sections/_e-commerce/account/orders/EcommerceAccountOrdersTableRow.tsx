import { useState } from 'react';
// @mui
import {
  Popover,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  InputBase,
} from '@mui/material';
//  utils
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
// types
import { IOrder } from 'src/types/order';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: IOrder;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function EcommerceAccountOrdersTableRow({ row, onSelectRow, selected }: Props) {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const inputStyles = {
    pl: 1,
    '&.Mui-focused': {
      bgcolor: 'action.selected',
    },
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <InputBase value={row.orderNumber} sx={inputStyles} />
        </TableCell>

        <TableCell>
          <InputBase value={row.items[0]?.name || ''} sx={inputStyles} />
        </TableCell>

        <TableCell>{fDate(row.delivery?.deliveredAt || '')}</TableCell>

        <TableCell>
          <InputBase value={fCurrency(row.totalAmount)} sx={inputStyles} />
        </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'cancelled' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { p: 1, width: 160 },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:view" sx={{ mr: 1 }} /> View
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Popover>
    </>
  );
}
