import type { TextFieldProps } from '@mui/material/TextField';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { MobileDateTimePickerProps } from '@mui/x-date-pickers/MobileDateTimePicker';
import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { formatStr } from 'src/utils/formatTime';
import { parseISO } from 'date-fns';

// ----------------------------------------------------------------------

interface RHFDatePickerProps {
  name: string;
  label: string;
  format?: string;
}

export function RHFDatePicker({ name, label, ...other }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const dateValue = field.value
          ? (field.value instanceof Date 
            ? field.value 
            : parseISO(field.value))
          : null;

        return (
          <DatePicker
            {...field}
            label={label}
            value={dateValue}
            onChange={(newValue) => {
              const formattedDate = newValue instanceof Date 
                ? newValue.toISOString()
                : newValue
                  ? new Date(newValue).toISOString()
                  : null;
              
              field.onChange(formattedDate);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = MobileDateTimePickerProps<Dayjs> & {
  name: string;
};

export function RHFMobileDateTimePicker({
  name,
  slotProps,
  ...other
}: RHFMobileDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDateTimePicker
          {...field}
          value={dayjs(field.value)}
          onChange={(newValue) => field.onChange(dayjs(newValue).format())}
          format={formatStr.split.dateTime}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
