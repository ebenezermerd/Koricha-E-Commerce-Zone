// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
// utils
import { fCurrency } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

type Props = {
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
};

export function CheckoutSummary({ total, subtotal, shipping, discount }: Props) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Order Summary" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Sub Total
          </Box>
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {fCurrency(subtotal)}
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Discount
          </Box>
          <Box component="span" sx={{ typography: 'subtitle2', color: 'error.main' }}>
            {fCurrency(-discount)}
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Shipping
          </Box>
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {shipping ? fCurrency(shipping) : 'Free'}
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'subtitle1' }}>
            Total
          </Box>
          <Box component="span" sx={{ typography: 'subtitle1' }}>
            {fCurrency(total)}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
} 