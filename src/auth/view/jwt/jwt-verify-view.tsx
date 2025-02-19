import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';
import { signOut } from 'src/auth/context/jwt/action';


import { toast } from 'src/components/snackbar';
import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { FormReturnLink } from '../../components/form-return-link';
import { EmailInboxIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

const CodeInput = styled('input')(({ theme }) => ({
  width: '50px',
  height: '50px',
  margin: '0 4px',
  borderRadius: '8px',
  border: `2px solid ${theme.palette.divider}`,
  fontSize: '24px',
  textAlign: 'center',
  outline: 'none',
  transition: 'all 0.2s ease',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
  },
}));

// ----------------------------------------------------------------------

export default function JwtVerifyView() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name=code-${index + 1}]`);
        if (nextInput) {
          (nextInput as HTMLElement).focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
      if (prevInput) {
        (prevInput as HTMLElement).focus();
      }
    }
  };

  const handleResendCode = async () => {
    try {
      setError('');
      await axios.post(endpoints.auth.emailVerifyResend, {
        email: sessionStorage.getItem('verification_email'),
      });
      setCountdown(60); // Start 60 second countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      toast.success('Verification code resent successfully');
    } catch (err) {
      console.error('Error resending code:', err);
      setError('Failed to resend verification code');
    }
  };

  const handleVerify = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      const otp = code.join('');

      if (otp.length !== 6) {
        setError('Please enter all 6 digits');
        return;
      }

      await axios.post(endpoints.auth.emailVerify, {
        email: sessionStorage.getItem('verification_email'),
        otp,
      });

      toast.success('Email verified successfully. Please sign in again.');
      sessionStorage.removeItem('verification_email');
      localStorage.removeItem('accessToken');

      // Sign out user
      signOut();

      router.push(paths.auth.jwt.signIn);
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title="Please check your email!"
        description={`We've emailed a 6-digit confirmation code. \nPlease enter the code in the box below to verify your email.`}
      />

      <Box sx={{ textAlign: 'center', mb: 5, mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Enter verification code
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              name={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              autoFocus={index === 0}
            />
          ))}
        </Stack>

        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleVerify}
          disabled={isSubmitting || code.some((digit) => !digit)}
        >
          Verify
        </Button>

        <Typography variant="body2" sx={{ mt: 3, mb: 3, color: 'text.secondary' }}>
          Didn&apos;t receive the code?{' '}
          <Button
            variant="text"
            sx={{ textTransform: 'none' }}
            onClick={handleResendCode}
            disabled={countdown > 0}
          >
            Resend code {countdown > 0 && `(${countdown}s)`}
          </Button>
        </Typography>
      </Box>

      <FormReturnLink 
        href={paths.auth.jwt.signIn} 
        sx={{ mt: 0 }} 
        onClick={() => {
          sessionStorage.removeItem('verification_email');
          signOut();
        }} 
      />
    </>
  );
}
