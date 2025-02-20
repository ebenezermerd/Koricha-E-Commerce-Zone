import { m } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function PaymentFailedView() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get error details from URL parameters if any
    const params = new URLSearchParams(location.search);
    const errorMessage = params.get('error');
    
    if (errorMessage) {
      console.error('Payment failed:', errorMessage);
    }
  }, [location]);

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Card sx={{
          maxWidth: 400,
          margin: 'auto',
          textAlign: 'center',
          padding: { xs: 2, md: 4 },
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <CardContent>
            <Iconify icon="mdi:close-circle" sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" component="h2">
              Payment Failed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sorry, there was an error processing your payment. Please try again or contact support if the problem persists.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              size="large"
              variant="contained"
              color="error"
              onClick={() => navigate(paths.eCommerce.checkout)}
            >
              Try Again
            </Button>
          </CardActions>
        </Card>
      </m.div>
    </MotionContainer>
  );
} 