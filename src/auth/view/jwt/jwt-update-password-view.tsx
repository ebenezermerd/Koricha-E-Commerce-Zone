import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';

import { toast } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import LoadingScreen from 'src/components/loading-screen';

import { FormHead } from '../../components/form-head';
import { updatePassword, checkResetToken } from '../../context/jwt';
import { NewPasswordIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

export type UpdatePasswordSchemaType = zod.infer<typeof UpdatePasswordSchema>;

export const UpdatePasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export default function JwtUpdatePasswordView() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const password = useBoolean();

  // Verify token when component mounts
  useEffect(() => {
    const verifyToken = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tokenParam = searchParams.get('token');

      if (!tokenParam) {
        setErrorMsg('Reset token not found');
        setIsLoading(false);
        return;
      }

      const isValid = await checkResetToken(tokenParam);
      setIsValidToken(isValid);
      setToken(tokenParam); // Set the token state
      setIsLoading(false);

      if (!isValid) {
        setErrorMsg('Invalid or expired reset token');
      }
    };

    verifyToken();
  }, []);

  const defaultValues = { password: '', confirmPassword: '' };

  const methods = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg('');
      const result = await updatePassword({
        password: data.password,
        options: {
          token,
          emailRedirectTo: `${window.location.origin}${paths.auth.jwt.signIn}`,
        },
      });

      if (result.error) {
        setErrorMsg(result.error.message);
      } else {
        // Show success message and redirect
        toast.success('Password updated successfully');
        router.push(paths.auth.jwt.signIn);
      }
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isValidToken || errorMsg === 'Invalid reset token') {
    return (
      <Box textAlign="center">
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
        <Button variant="contained" onClick={() => router.push(paths.auth.jwt.resetPassword)}>
          Request New Reset Link
        </Button>
      </Box>
    );
  }

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <RHFTextField
        name="password"
        label="Password"
        placeholder="8+ characters"
        helperText="Must contain uppercase, lowercase, number and special character"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm password"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        type="submit"
        size="large"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Update password..."
      >
        Update password
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<NewPasswordIcon />}
        title="Update password"
        description="Successful updates enable access using the new password."
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
