import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';

import { varAlpha } from 'src/theme/styles';

import Iconify from '../iconify';
import { uploadClasses } from './classes';

import type { UploadProps } from './types';

// ----------------------------------------------------------------------

export function UploadBox({ placeholder, error, disabled, className, sx, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const hasError = isDragReject || error;

  return (
    <Box
      {...getRootProps()}
      className={uploadClasses.uploadBox.concat(className ? ` ${className}` : '')}
      sx={{
        width: 64,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => varAlpha(theme.palette.grey['500'], 0.08),
        border: (theme) => `dashed 1px ${varAlpha(theme.palette.grey['500'], 0.16)}`,
        ...(isDragActive && { opacity: 0.72 }),
        ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
        ...(hasError && {
          color: 'error.main',
          borderColor: 'error.main',
          bgcolor: (theme) => varAlpha(theme.palette.error.main, 0.08),
        }),
        '&:hover': { opacity: 0.72 },
        ...sx,
      }}
    >
      <input {...getInputProps()} />

      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </Box>
  );
}
