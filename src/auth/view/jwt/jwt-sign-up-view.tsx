import { useState } from 'react';
import * as zod from 'zod';
import { useForm, FormProvider } from 'react-hook-form';  // Import FormProvider
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Link, MenuItem } from '@mui/material';
import  Iconify from 'src/components/iconify';
import { FormHead } from '../../components/form-head';
import { useAuthContext } from '../../hooks';
import { signUp } from '../../context/jwt';
import { RegistrationView } from '../registration-view'; // Import RegistrationView

export const SignUpSchema = zod.object({
  role: zod.string().min(1, { message: 'User type is required!' }),
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phone: zod.string().min(1, { message: 'Phone number is required!' }),
  sex: zod.string().min(1, { message: 'Sex is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters long!' }),
});


export function JwtSignUpView () {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <>
      <FormHead
        title="Registration Form"
        description="please carefully fill all fields of the form."
        sx={{ textAlign: { xs: 'center', md: 'left',} }}
      />
      {/* Render RegistrationView instead of the existing form */}
      <RegistrationView />
    </>
  );
}
