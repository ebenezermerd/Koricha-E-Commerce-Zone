import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import { m, domAnimation, LazyMotion } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import  Iconify  from 'src/components/iconify';
import FormProvider, { RHFPhoneInput, RHFTextField } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';

import { alpha, styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {schemaHelper} from 'src/components/hook-form/schema-helper';

// ----------------------------------------------------------------------

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  '& .MuiToggleButton-root': {
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

const SignInSchema = zod.object({
  identifier: zod.string().min(1, { message: 'Email or phone number is required!' }).refine((value) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\+[1-9]\d{1,14}$/.test(value);
    return isEmail || isPhone;
  }, { message: 'Please enter a valid email or phone number' }),
  password: zod.string().min(1, { message: 'Password is required!' }).min(6, { message: 'Password must be at least 6 characters!' }),
});

const EmailSignInSchema = zod.object({
  identifier: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Please enter a valid email address' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

const PhoneSignInSchema = zod.object({
  identifier: schemaHelper.phoneNumber({
    isValidPhoneNumber,
    message: {
      required_error: 'Phone number is required!',
      invalid_type_error: 'Phone number must be in E.164 format (e.g., +251 911 123 ***)'
    }
  }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const returnTo = searchParams.get('returnTo');

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputMethod, setInputMethod] = useState<'email' | 'phone'>('email');

  const password = useBoolean();
  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(inputMethod === 'email' ? EmailSignInSchema : PhoneSignInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    reset,
  } = methods;

  const handleInputMethodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMethod: 'email' | 'phone' | null,
  ) => {
    if (newMethod !== null) {
      setInputMethod(newMethod);
      reset({ identifier: '', password: '' });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMsg('');

      const response = await signInWithPassword({ 
        identifier: data.identifier, 
        password: data.password 
      });

      if (response.error) {
        setErrorMsg(response.error.message || 'Invalid credentials');
        return;
      }

      if (response.data?.status === 'verification_required') {
        sessionStorage.setItem('verification_email', data.identifier);
        router.push(paths.auth.jwt.verify);
        return;
      }

      await checkUserSession?.();

      if (returnTo) {
        router.push(returnTo);
      } else {
        router.push(paths.eCommerce.landing);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setErrorMsg(
        error.response?.data?.message || 
        error.message || 
        'Authentication failed'
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  const renderToggle = (
    <StyledToggleButtonGroup
      value={inputMethod}
      exclusive
      onChange={handleInputMethodChange}
      aria-label="sign in method"
      fullWidth
    >
      <ToggleButton value="email" aria-label="email sign in">
        <Iconify icon="eva:email-outline" sx={{ mr: 1 }} />
        Email
      </ToggleButton>
      <ToggleButton value="phone" aria-label="phone sign in">
        <Iconify icon="eva:phone-outline" sx={{ mr: 1 }} />
        Phone
      </ToggleButton>
    </StyledToggleButtonGroup>
  );

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {renderToggle}

      <Box sx={{ display: inputMethod === 'email' ? 'block' : 'none' }}>
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RHFTextField
              name="identifier"
              label="Email address"
              placeholder="example@email.com"
              size="medium"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </m.div>
        </LazyMotion>
      </Box>

      <Box sx={{ display: inputMethod === 'phone' ? 'block' : 'none' }}>
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <RHFPhoneInput
              name="identifier"
              label="Phone Number"
              placeholder="911 123 ***"
            />
          </m.div>
        </LazyMotion>
      </Box>

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        placeholder="Enter your password"
        size="medium"
        variant="outlined"
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

      <Link
        component={RouterLink}
        href={paths.auth.jwt.resetPassword}
        variant="body2"
        color="primary"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don't have an account? `}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
              Create a new account
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
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
