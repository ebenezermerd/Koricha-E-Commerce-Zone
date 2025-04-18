import { useState } from 'react';
import {
  Box,
  Card,
  Stack,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Alert,
  Paper,
  Fade,
  Collapse,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { IOrder, DeliveryStatus } from 'src/types/order';
import { useBoolean } from 'src/hooks/use-boolean';
import { toast } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import { useDelivery } from 'src/services/useDelivery';

// ----------------------------------------------------------------------

type Props = {
  order: IOrder;
};

export default function OrderDeliveryConfirmation({ order }: Props) {
  const confirm = useBoolean();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { confirmDelivery } = useDelivery();

  const handleConfirmDelivery = async () => {
    try {
      setIsSubmitting(true);
      await confirmDelivery(order.id);
      toast.success('Delivery confirmed successfully');
      confirm.onFalse();
    } catch (error) {
      console.error('Error confirming delivery:', error);
      toast.error('Failed to confirm delivery');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!order.delivery) {
    return null;
  }

  const deliveryStatus = order.status as DeliveryStatus;

  if (deliveryStatus === 'completed') {
    return (
      <Fade in timeout={1000}>
        <Card sx={{ mt: 3, position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
            }}
          />
          
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <IconButton
                onClick={handleExpandClick}
                aria-label={expanded ? "Show less delivery details" : "Show more delivery details"}
                sx={{
                  position: 'absolute',
                  right: -16,
                  top: -16,
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              >
                <Iconify icon="eva:chevron-down-fill" />
              </IconButton>
              <Iconify
                icon="eva:checkmark-circle-2-fill"
                sx={{
                  width: 60,
                  height: 60,
                  color: 'success.main',
                  mb: 2,
                }}
              />
              <Typography variant="h4" sx={{ mb: 1 }}>
                Thank You for Shopping With Us!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your order has been successfully delivered and confirmed
              </Typography>
            </Box>

            <Collapse in={expanded} timeout="auto">
              <Stack spacing={3}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    bgcolor: 'background.neutral',
                    borderRadius: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="eva:pin-outline" width={20} />
                      <Typography variant="body2">
                        Tracking Number: {order.delivery.trackingNumber}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="eva:calendar-outline" width={20} />
                      <Typography variant="body2">
                        Delivered on: {order.delivery.estimatedDeliveryDate ? new Date(order.delivery.estimatedDeliveryDate).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Ready for More Amazing Products?
                  </Typography>
                  
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Iconify icon="eva:shopping-bag-outline" />}
                      href="/products"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Iconify icon="eva:star-outline" />}
                      href={`/review/${order.id}`}
                    >
                      Review Product
                    </Button>
                  </Stack>
                </Box>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Stay tuned for our upcoming release which will include special discounts and rewards for our loyal customers!
                </Alert>
              </Stack>
            </Collapse>
          </Stack>
        </Card>
      </Fade>
    );
  }

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1">Delivery Confirmation</Typography>

          <Alert 
            severity="info"
            action={
              <Button
                color="info"
                size="small"
                onClick={confirm.onTrue}
                startIcon={<Iconify icon="eva:checkmark-circle-2-outline" />}
              >
                Confirm Receipt
              </Button>
            }
          >
            Please confirm if you have received your order
          </Alert>

          <Box sx={{ color: 'text.secondary' }}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Iconify icon="eva:pin-outline" width={16} />
              <Typography variant="body2">
                Tracking Number: {order.delivery.trackingNumber}
              </Typography>
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Iconify icon="eva:clock-outline" width={16} />
              <Typography variant="body2">
                Status: {deliveryStatus?.replace(/_/g, ' ')}
              </Typography>
            </Stack>

            {order.delivery.estimatedDeliveryDate && (
              <Stack spacing={1} direction="row" alignItems="center" sx={{ mt: 1 }}>
                <Iconify icon="eva:calendar-outline" width={16} />
                <Typography variant="body2">
                  Estimated Delivery: {new Date(order.delivery.estimatedDeliveryDate).toLocaleDateString()}
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Card>

      <Dialog open={confirm.value} onClose={confirm.onFalse}>
        <DialogTitle>Confirm Delivery Receipt</DialogTitle>

        <DialogContent sx={{ color: 'text.secondary' }}>
          <Typography>
            By confirming, you acknowledge that you have received your order in good condition.
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={confirm.onFalse}>
            Cancel
          </Button>

          <LoadingButton
            variant="contained"
            loading={isSubmitting}
            onClick={handleConfirmDelivery}
          >
            Confirm Receipt
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}