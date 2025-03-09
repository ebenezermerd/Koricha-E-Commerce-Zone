import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
// types
import { PendingPayment } from 'src/services/usePendingPayments';
// components
import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/formatNumber';
import { fDateTime } from 'src/utils/formatTime';
import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

type Props = {
  pendingPayments: PendingPayment[];
  isLoading: boolean;
  onResume: (tx_ref: string) => Promise<any>;
  isResuming: boolean;
};

export default function CheckoutPendingPayments({ pendingPayments, isLoading, onResume, isResuming }: Props) {
  const [resumingId, setResumingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Pending Payments" />
        <CardContent>
          <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 5 }}>
            <CircularProgress />
            <Typography variant="body2">Loading pending payments...</Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (!pendingPayments.length) {
    return null;
  }

  const handleResume = async (tx_ref: string) => {
    try {
      setResumingId(tx_ref);
      const result = await onResume(tx_ref);
      
      // Redirect to Chapa checkout URL
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      }
    } catch (error) {
      console.error('Error resuming payment:', error);
      toast.error('Failed to resume payment. Please try again.');
    } finally {
      setResumingId(null);
    }
  };

  return (
    <Card>
      <CardHeader 
        title="Pending Payments" 
        subheader="You have unfinished payments that you can resume"
      />
      <CardContent>
        <Stack spacing={3}>
          {pendingPayments.map((payment) => (
            <Box key={payment.tx_ref} sx={{ position: 'relative' }}>
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{
                  p: 2,
                  borderRadius: 1,
                  position: 'relative',
                  border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                }}
              >
                <Stack spacing={0.5} flexGrow={1}>
                  <Typography variant="subtitle2">
                    Order #{payment.order_number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {payment.items_count} {payment.items_count === 1 ? 'item' : 'items'} • {fDateTime(payment.created_at)}
                  </Typography>
                </Stack>

                <Stack spacing={0.5} alignItems="flex-end">
                  <Typography variant="subtitle2">{fCurrency(payment.amount)}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleResume(payment.tx_ref)}
                    disabled={isResuming && resumingId === payment.tx_ref}
                    startIcon={
                      isResuming && resumingId === payment.tx_ref ? (
                        <CircularProgress size={16} />
                      ) : (
                        <Iconify icon="eva:arrow-forward-fill" />
                      )
                    }
                  >
                    {isResuming && resumingId === payment.tx_ref ? 'Resuming...' : 'Resume Payment'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
} 