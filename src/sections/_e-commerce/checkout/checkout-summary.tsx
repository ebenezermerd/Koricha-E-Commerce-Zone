// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// utils
import { fCurrency } from 'src/utils/formatNumber';
import { alpha } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  items: { 
    quantity: number;
    product: {
      quantity_threshold?: number | null;
      additional_cost_type?: 'percentage' | 'fixed' | null;
      additional_cost_percentage?: number | null;
      additional_cost_fixed?: number | null;
      price: number;
    }
  }[];
};

export function CheckoutSummary({ total, subtotal, shipping, discount, items }: Props) {
  // Calculate VAT (15%)
  const vatRate = 0.15;
  
  // Calculate additional costs if any
  const additionalCostsTotal = items.reduce((sum, item) => {
    const { product, quantity } = item;
    
    if (product.quantity_threshold && quantity > product.quantity_threshold) {
      if (product.additional_cost_type === 'percentage' && product.additional_cost_percentage) {
        return sum + (product.price * (product.additional_cost_percentage / 100) * quantity);
      } else if (product.additional_cost_type === 'fixed' && product.additional_cost_fixed) {
        return sum + product.additional_cost_fixed;
      }
    }
    return sum;
  }, 0);
  
  // Check if any item has additional costs
  const hasAdditionalCosts = additionalCostsTotal > 0;
  
  // Calculate totals including additional costs
  const baseSubtotal = subtotal - additionalCostsTotal; // Remove additional costs if included in subtotal
  const vatAmount = (baseSubtotal - discount) * vatRate;
  const finalTotal = baseSubtotal + additionalCostsTotal - discount + shipping + vatAmount;
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
            {fCurrency(baseSubtotal)}
          </Box>
        </Stack>
        
        {hasAdditionalCosts && (
          <Stack direction="row" justifyContent="space-between">
            <Tooltip title="Additional costs applied for large quantity orders">
              <Box component="span" sx={{ typography: 'body2', color: 'warning.main', display: 'flex', alignItems: 'center' }}>
                Additional Costs
                <Iconify icon="eva:info-outline" width={16} height={16} sx={{ ml: 0.5 }} />
              </Box>
            </Tooltip>
            <Box component="span" sx={{ typography: 'subtitle2', color: 'warning.main' }}>
              {fCurrency(additionalCostsTotal)}
            </Box>
          </Stack>
        )}

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
          <Box component="span" sx={{ typography: 'subtitle1', color: 'error.main' }}>
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