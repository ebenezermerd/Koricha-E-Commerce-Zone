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
  Typography,
  Collapse,
} from '@mui/material';
//  utils
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
// types
import { IOrder } from 'src/types/order';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import OrderDetailsCard from './OrderDetailsCard';

// ----------------------------------------------------------------------

type Props = {
  row: IOrder;
  selected: boolean;
  onSelectRow: VoidFunction;
  onResumePayment?: (tx_ref: string) => Promise<any>;
  isResumingPayment?: boolean;
};

export default function EcommerceAccountOrdersTableRow({
  row,
  selected,
  onSelectRow,
  onResumePayment,
  isResumingPayment,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleToggleDetails = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleSelectRow = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelectRow();
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
          <Checkbox color="primary" checked={selected} onClick={handleSelectRow} />
        </TableCell>

        <TableCell>
          <InputBase value={row.orderNumber} sx={inputStyles} readOnly />
        </TableCell>

        <TableCell>
          <InputBase value={row.items[0]?.name || ''} sx={inputStyles} readOnly />
        </TableCell>

        <TableCell>{fDate(row.history?.deliveryTime || '')}</TableCell>

        <TableCell>
          <InputBase value={fCurrency(row.totalAmount)} sx={inputStyles} readOnly />
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
          <IconButton onClick={handleToggleDetails}>
            <Iconify icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"} />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <OrderDetailsCard 
              order={row}
              onResumePayment={onResumePayment}
              isResumingPayment={isResumingPayment}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
