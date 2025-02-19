import { Controller, useFormContext } from 'react-hook-form';
import { TextField, MenuItem } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
};

export function RHFSelect({ name, native, children, helperText, ...other }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{
            native: native,
            sx: { 
              textTransform: 'capitalize',
              cursor: 'pointer',
              '& .MuiSelect-select': {
                cursor: 'pointer',
              },
              '& .MuiMenuItem-root': {
                cursor: 'pointer',
              }
            },
            ...other.SelectProps,
          }}
          error={!!error}
          helperText={error?.message || helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
} 