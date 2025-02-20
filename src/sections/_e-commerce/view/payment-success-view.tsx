import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Iconify from 'src/components/iconify';
// components
import { MotionContainer, varBounce, varFade } from 'src/components/animate';
import { useCart } from 'src/contexts/cart-context';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface TransactionDetails {
  txRef: string | null;
  transactionId: string | null;
  amount?: string | null;
  currency?: string | null;
  status?: string | null;
}

export default function PaymentSuccessView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch: cartDispatch } = useCart();
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);

  useEffect(() => {
    // Get payment data from URL parameters
    const params = new URLSearchParams(location.search);
    const details: TransactionDetails = {
      txRef: params.get('tx_ref'),
      transactionId: params.get('transaction_id'),
      amount: params.get('amount'),
      currency: params.get('currency'),
      status: params.get('status'),
    };
    setTransactionDetails(details);
    
    // Clear cart
    cartDispatch({ type: 'RESET' });
    localStorage.removeItem('pendingOrder');
  }, [location, cartDispatch]);

  return (
    <MotionContainer>
      <Stack
        spacing={5}
        sx={{
          m: 'auto',
          maxWidth: 600,
          textAlign: 'center',
          pt: { xs: 5, md: 10 },
          pb: { xs: 10, md: 20 },
        }}
      >
        <m.div variants={varBounce().in}>
          <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
            <Iconify
              icon="eva:checkmark-circle-2-fill"
              sx={{
                width: 80,
                height: 80,
                color: 'success.main',
                margin: '0 auto',
              }}
            />
          </Box>

          <Typography variant="h3" paragraph>
            Thank you for your purchase!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Your order has been placed successfully.
            We will contact you soon with the delivery details.
          </Typography>
        </m.div>

        {transactionDetails && (
          <m.div variants={varFade().in}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Transaction Details
                  </Typography>

                  <Stack spacing={2} divider={<Divider flexItem />}>
                    {transactionDetails.transactionId && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Transaction ID
                        </Typography>
                        <Typography variant="subtitle2">
                          {transactionDetails.transactionId}
                        </Typography>
                      </Stack>
                    )}

                    {transactionDetails.txRef && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Reference
                        </Typography>
                        <Typography variant="subtitle2">
                          {transactionDetails.txRef}
                        </Typography>
                      </Stack>
                    )}

                    {transactionDetails.amount && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Amount
                        </Typography>
                        <Typography variant="subtitle2">
                          {`${transactionDetails.currency || 'ETB'} ${transactionDetails.amount}`}
                        </Typography>
                      </Stack>
                    )}

                    {transactionDetails.transactionId && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Transaction ID
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'success.main',
                            textTransform: 'capitalize',
                          }}
                        >
                          {transactionDetails.transactionId}
                        </Typography>
                      </Stack>
                    )}
                    {transactionDetails.status && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Payment Status:
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'success.main',
                            textTransform: 'capitalize',
                          }}
                        >
                          {transactionDetails.status}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </m.div>
        )}

        <m.div variants={varBounce().in}>
          <Button
            size="large"
            variant="contained"
            onClick={() => navigate(paths.eCommerce.products)}
          >
            Continue Shopping
          </Button>
        </m.div>
      </Stack>
    </MotionContainer>
  );
}