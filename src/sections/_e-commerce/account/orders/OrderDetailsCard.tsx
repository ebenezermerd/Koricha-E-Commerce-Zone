import { useState } from 'react';
import { Card, Stack, Typography, Divider, Grid, Avatar, Box, Button, CircularProgress } from '@mui/material';
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
import { IOrder } from 'src/types/order';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { toast } from 'src/components/snackbar';

type Props = {
  order: IOrder;
  onResumePayment?: (tx_ref: string) => Promise<any>;
  isResumingPayment?: boolean;
};

export default function OrderDetailsCard({ order, onResumePayment, isResumingPayment = false }: Props) {
  const [isResuming, setIsResuming] = useState(false);
  
  if (!order) return null;

  // Check if this is a pending Chapa payment that can be resumed
  const canResumePayment = 
    order.status === 'pending' && 
    order.payment?.status === 'initiated' && 
    order.payment?.method === 'chapa' &&
    (order.payment?.txRef || order.payment?.tx_ref) &&
    onResumePayment;

  const handleResumePayment = async () => {
    if (!canResumePayment) return;
    
    const txRef = order.payment?.txRef || order.payment?.tx_ref;
    
    try {
      setIsResuming(true);
      const result = await onResumePayment(txRef || '');
      
      // Redirect to Chapa checkout URL
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      }
    } catch (error) {
      console.error('Error resuming payment:', error);
      toast.error('Failed to resume payment. Please try again.');
    } finally {
      setIsResuming(false);
    }
  };

  return (
    <Card sx={{ mt: 3, p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Order Details</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Label
            color={
              (order.status === 'completed' && 'success') ||
              (order.status === 'pending' && 'warning') ||
              (order.status === 'cancelled' && 'error') ||
              'default'
            }
          >
            {order.status}
          </Label>
          
          {canResumePayment && (
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={handleResumePayment}
              disabled={isResuming || isResumingPayment}
              startIcon={
                isResuming ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <Iconify icon="eva:credit-card-fill" />
                )
              }
            >
              {isResuming ? 'Resuming...' : 'Resume Payment'}
            </Button>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Order Information
          </Typography>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Order Number:
              </Typography>
              <Typography variant="body2">{order.orderNumber}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Date Placed:
              </Typography>
              <Typography variant="body2">{fDate(order.createdAt)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Total Amount:
              </Typography>
              <Typography variant="body2">{fCurrency(order.totalAmount)}</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Delivery Information
          </Typography>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Shipping Method:
              </Typography>
              <Typography variant="body2">{order.delivery?.shipBy || 'Standard Shipping'}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Delivery Speed:
              </Typography>
              <Typography variant="body2">{order.delivery?.speedy || 'Standard Delivery'}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Tracking Number:
              </Typography>
              <Typography variant="body2">{order.delivery?.trackingNumber || 'N/A'}</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Shipping Address
          </Typography>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Full Address:
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 200, textAlign: 'right' }}>
                {order.shippingAddress?.fullAddress || 'N/A'}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Contact Phone:
              </Typography>
              <Typography variant="body2">
                {order.shippingAddress?.phoneNumber || 'N/A'}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Payment Details
          </Typography>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Payment Method:
              </Typography>
              <Typography variant="body2">{order.payment?.cardType || order.payment?.method || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Transaction ID:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  maxWidth: 200,
                  wordBreak: 'break-all',
                  whiteSpace: 'normal',
                  textAlign: 'right',
                }}
              >
                {order.payment?.txRef || order.payment?.tx_ref || 'N/A'}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Payment Status:
              </Typography>
              <Typography variant="body2">{order.payment?.status || 'N/A'}</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Items Ordered
          </Typography>
          <Stack spacing={2}>
            {order.items?.map((item) => (
              <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={item.coverUrl || item.image}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {fCurrency(item.price)} x {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {fCurrency(item.price * item.quantity)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
} 