// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// utils
import { fCurrency } from 'src/utils/formatNumber';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  items: { quantity: number }[];
};

export function CheckoutSummary({ total, subtotal, shipping, discount, items }: Props) {
  // Calculate VAT (15%)
  const vatRate = 0.15;
  const vatAmount = (subtotal - discount) * vatRate;
  const finalTotal = subtotal - discount + shipping + vatAmount;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Order Summary" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Total Items
          </Box>
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Box>
        </Stack>

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

        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            VAT (15%)
          </Box>
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {fCurrency(vatAmount)}
          </Box>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between">
          <Box component="span" sx={{ typography: 'subtitle1' }}>
            Total
          </Box>
          <Box component="span" sx={{ typography: 'subtitle1' }}>
            {fCurrency(finalTotal)}
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.04),
            border: (theme) => `1px dashed ${alpha(theme.palette.info.main, 0.24)}`,
          }}
        >
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.primary', display: 'block' }}>
            The total amount includes VAT (15%)
            <br />
            All prices are inclusive of applicable taxes
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
} 