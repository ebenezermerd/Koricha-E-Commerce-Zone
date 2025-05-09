import { Controller, useFormContext } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
// components
import { varAlpha } from 'src/theme/styles';
import { fCurrency } from 'src/utils/formatNumber';
import { useCheckout } from './context/checkout-context';

// ----------------------------------------------------------------------

type OptionProps = {
  label: string;
  value: number;
  description: string;
};

type Props = {
  options: OptionProps[];
};

export function CheckoutDelivery({ options }: Props) {
  const { control } = useFormContext();
  const checkout = useCheckout();

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Delivery" />

      <Controller
        name="delivery"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Stack sx={{ px: 3, pb: 3 }}>
            {options.map((option) => (
              <OptionItem
                key={option.value}
                option={option}
                selected={field.value === option.value}
                onClick={() => {
                  field.onChange(option.value);
                  checkout.onApplyShipping(option.value);
                }}
              />
            ))}

            {!!error && (
              <FormHelperText error sx={{ pt: 1 }}>
                {error.message}
              </FormHelperText>
            )}
          </Stack>
        )}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type OptionItemProps = {
  option: OptionProps;
  selected: boolean;
  onClick: VoidFunction;
};

function OptionItem({ option, selected, onClick }: OptionItemProps) {
  const { value, label, description } = option;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      onClick={onClick}
      sx={{
        p: 2.5,
        mt: 2,
        cursor: 'pointer',
        borderRadius: 1,
        position: 'relative',
        border: (theme) => `solid 1px ${varAlpha("145 158 171", 0.24)}`,
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
    >
      <Stack flexGrow={1}>
        <Box component="span" sx={{ typography: 'subtitle1', mb: 0.5 }}>
          {label}
        </Box>

        <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
          {description}
        </Box>
      </Stack>

      <Box component="span" sx={{ typography: 'h6' }}>
        {!value ? 'Free' : fCurrency(value)}
      </Box>
    </Stack>
  );
} 