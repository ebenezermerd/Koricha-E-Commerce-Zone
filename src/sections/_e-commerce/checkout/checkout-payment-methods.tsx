import { Controller, useFormContext } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
// components
import { varAlpha } from 'src/theme/styles';
import Iconify from 'src/components/iconify';
import { CONFIG } from 'src/config-global';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'chapa',
    label: 'Pay with Chapa',
    description: 'You will be redirected to Chapa website to complete your purchase securely.',
  },
  {
    value: 'cash',
    label: 'Pay Cash On Delivery',
    description: 'Pay with cash when your order is delivered.',
  },
];

// ----------------------------------------------------------------------

export function CheckoutPaymentMethods() {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader title="Payment Method" />

      <Controller
        name="payment"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box sx={{ p: 3 }}>
            {PAYMENT_OPTIONS.map((option) => (
              <OptionItem
                key={option.value}
                option={option}
                selected={field.value === option.value}
                onClick={() => field.onChange(option.value)}
              />
            ))}

            {!!error && (
              <FormHelperText error sx={{ pt: 1 }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        )}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type OptionItemProps = {
  option: {
    value: string;
    label: string;
    description: string;
  };
  selected: boolean;
  onClick: VoidFunction;
};

function OptionItem({ option, selected, onClick }: OptionItemProps) {
  const { value, label, description } = option;

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        mt: 2,
        cursor: 'pointer',
        borderRadius: 1,
        position: 'relative',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
    >
      <Box sx={{ ml: 1 }}>
        <Box sx={{ typography: 'subtitle1', mb: 0.5 }}>{label}</Box>
        <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{description}</Box>
      </Box>

      {value === 'chapa' && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <img
            alt="chapa"
            src={`${CONFIG.assetsDir}/assets/icons/payment/chapa.png`}
            width="134px"
          />
        </Box>
      )}

      {value === 'cash' && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <Iconify icon="solar:wad-of-money-bold" width={32} />
        </Box>
      )}
    </Box>
  );
} 