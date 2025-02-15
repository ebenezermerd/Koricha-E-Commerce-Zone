// @mui
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
// components
import { useCheckout } from './context/checkout-context';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

export default function CheckoutStepper() {
  const { activeStep } = useCheckout();

  return (
    <Box sx={{ mb: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
} 