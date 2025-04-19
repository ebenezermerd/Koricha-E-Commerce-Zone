import { Controller, useFormContext } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

import { Upload, UploadBox, UploadAvatar } from '../upload';
import type { UploadProps } from '../upload/types';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
}

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onDrop = (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];

          if (file) {
            setValue(name, file, { shouldValidate: true });
          }
        };

        return (
          <div>
            <UploadAvatar error={!!error} value={field.value} onDrop={onDrop} {...other} />

            {!!error && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox value={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export default function RHFUpload({ name, multiple, helperText, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onDrop = (acceptedFiles: File[]) => {
          if (multiple) {
            if (field.value) {
              setValue(name, [...field.value, ...acceptedFiles], { shouldValidate: true });
            } else {
              setValue(name, acceptedFiles, { shouldValidate: true });
            }
          } else {
            setValue(name, acceptedFiles[0], { shouldValidate: true });
          }
        };

        const onDelete = () => {
          setValue(name, null, { shouldValidate: true });
        };

        const onRemove = (file: File | string) => {
          if (multiple) {
            const filteredItems = (field.value as Array<File | string>).filter((item) => item !== file);
            setValue(name, filteredItems, { shouldValidate: true });
          }
        };

        const uploadProps = {
          multiple,
          onDrop,
          onDelete,
          onRemove,
          accept: {
            'image/*': [],
            'application/pdf': [],
          },
          value: field.value,
          error: !!error,
          helperText: error?.message || helperText,
          ...other,
        };

        return <Upload {...uploadProps} />;
      }}
    />
  );
} 