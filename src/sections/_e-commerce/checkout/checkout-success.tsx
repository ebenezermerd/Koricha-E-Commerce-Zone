import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <MotionContainer>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Thank you for your purchase!
          </Typography>
        </m.div>

        <Typography sx={{ color: 'text.secondary' }}>
          Your order has been placed successfully.
          <br />
          We will send you an email with your order details.
        </Typography>

        <m.div variants={varBounce().in}>
          <Box
            component="img"
            src="/assets/icons/confirmation/order_confirmed.svg"
            sx={{ height: 260, my: { xs: 5, sm: 8 } }}
          />
        </m.div>

        <Button
          size="large"
          variant="contained"
          onClick={() => navigate(paths.eCommerce.products)}
        >
          Continue Shopping
        </Button>
      </Box>
    </MotionContainer>
  );
} 