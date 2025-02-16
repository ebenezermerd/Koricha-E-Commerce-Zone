import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';
import { FormHead } from '../components/form-head';
import { signUp } from '../context/jwt';
import { useAuthContext } from '../hooks/use-auth-context';
import {
  BasicInfoStep,
  PasswordStep,
  SuccessStep,
} from '../components';
import {
  RegistrationSchema,
  BasicInfoSchema,
  PasswordSchema,
  type RegistrationSchemaType,
} from '../registration';

const STEPS = [
  { label: 'Basic Information', component: BasicInfoStep, schema: BasicInfoSchema },
  { label: 'Set Password', component: PasswordStep, schema: PasswordSchema },
  { label: 'Success', component: SuccessStep },
];

export function CustomerSignUpView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      role: 'customer',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      sex: '',
      address: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
    watch,
  } = methods;

  const role = watch('role');

  const handleNext = async () => {
    const currentSchema = STEPS[activeStep].schema;
    if (currentSchema) {
      const isValid = await trigger(Object.keys(currentSchema.shape));
      if (isValid) {
        if (activeStep === 1) {
          await handleSubmitForm();
          return;
        }
        setActiveStep((prev) => prev + 1);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmitForm = async () => {
    try {
      const data = methods.getValues();
      if (data.password !== data.password_confirmation) {
        setErrorMsg('Passwords do not match');
        return;
      }
      const signUpData = {
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        address: data.address,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      };
      await signUp(signUpData);
      await checkUserSession?.();
      setActiveStep(STEPS.length - 1);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const CurrentStepComponent = STEPS[activeStep]?.component;

  const renderNavigation = () => {
    if (activeStep === STEPS.length - 1) return null;

    const isLastStep = activeStep === 1;

    return (
      <Box display="flex" gap={2} justifyContent="flex-end">
        <LoadingButton
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handlePrevious}
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
        >
          Previous
        </LoadingButton>
        <LoadingButton
          variant="contained"
          onClick={isLastStep ? handleSubmitForm : handleNext}
          loading={isSubmitting}
          endIcon={<Iconify icon="eva:arrow-forward-fill" />}
        >
          {isLastStep ? 'Finish Registration' : 'Next'}
        </LoadingButton>
      </Box>
    );
  };

  if (!CurrentStepComponent) return null;

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods}>
        <Box gap={3} display="flex" flexDirection="column">
          <CurrentStepComponent />
          {renderNavigation()}
        </Box>
      </FormProvider>

      {activeStep === 0 && (
        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
            Already have an account? Login
          </Link>
        </Box>
      )}
    </>
  );
}