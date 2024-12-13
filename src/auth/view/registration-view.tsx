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
import  Iconify  from 'src/components/iconify';
import  FormProvider  from 'src/components/hook-form';
import { FormHead } from '../components/form-head';
import { signUp } from '../context/jwt';
import { useAuthContext } from '../hooks/use-auth-context';
import {
  RoleSelectionStep,
  BasicInfoStep,
  CompanyInfoStep,
  PasswordStep,
  AgreementStep,
  SuccessStep,
} from '../components';
import {
  RegistrationSchema,
  RoleSchema,
  BasicInfoSchema,
  CompanyInfoSchema,
  PasswordSchema,
  AgreementSchema,
  type RegistrationSchemaType,
} from '../registration';

const STEPS = [
  { label: 'Select Role', component: RoleSelectionStep, schema: RoleSchema },
  { label: 'Basic Information', component: BasicInfoStep, schema: BasicInfoSchema },
  { label: 'Company Information', component: CompanyInfoStep, schema: CompanyInfoSchema },
  { label: 'Set Password', component: PasswordStep, schema: PasswordSchema },
  { label: 'Agreement', component: AgreementStep, schema: AgreementSchema },
  { label: 'Success', component: SuccessStep },
];

export function RegistrationView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      role: 'customer',
      firstName: '', // Add default value
      lastName: '', // Add default value
      email: '', // Add default value
      phone: '', // Add default value
      sex: '', // Set default value to an empty string
      address: '', // Add default value
      password: '', // Add default value
      companyName: '', // Add default value
      description: '', // Add default value
      companyEmail: '', // Add default value
      companyPhone: '', // Add default value
      country: '', // Add default value
      city: '', // Add default value
      companyAddress: '', // Add default value
      agreement: false,
    },
    mode: 'onChange', // Validate on change
    reValidateMode: 'onBlur', // Re-validate on blur
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
    console.log('Current Step:', activeStep, 'Schema:', currentSchema);
    if (currentSchema) {
      // Use trigger to validate the current step
      const isValid = await trigger(Object.keys(currentSchema.shape));
      console.log('Validation Result:', isValid);
      console.log('Role:', role);

      if (isValid) {
        if (role === 'customer') {
          if (activeStep === 1) {
            setActiveStep(3); // Skip Company Information for customers
            return;
          }
          if (activeStep === 3) {
            await handleSubmitForm(); // Submit form after password step for customers
            return;
          }
        } else if (role === 'supplier' && activeStep === 4) {
          await handleSubmitForm(); // Submit form after agreement step for suppliers
          return;
        }
        setActiveStep((prev) => prev + 1);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    console.log('Previous Step:', activeStep - 1);
    if (role === 'customer') {
      if (activeStep === 5) {
        setActiveStep(3); // Skip Agreement for customers
      } else if (activeStep === 3) {
        setActiveStep(1); // Skip Company Information for customers
      } else {
        setActiveStep((prev) => Math.max(prev - 1, 0));
      }
    } else {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleSubmitForm = async () => {
    try {

      const data = methods.getValues();
      console.log('Submitting Form:', data);
      if (role === 'supplier' && !data.agreement) {
        setErrorMsg('You must agree to the terms!');
        return;
      }
      if (role === 'customer' && data.password !== data.confirmPassword) {
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
        password_confirmation: data.confirmPassword,
        companyName: data.companyName,
        description: data.description,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        country: data.country,
        city: data.city,
        region: data.region,
        companyAddress: data.companyAddress,
        agreement: data.agreement,
      };
      await signUp(signUpData);
      await checkUserSession?.();
      setActiveStep(STEPS.length - 1); // Show success step
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const CurrentStepComponent = STEPS[activeStep]?.component;

  const getLastStepIndex = () => {
    if (role === 'supplier') return STEPS.length - 2;
    if (role === 'customer') return 5; // Skip Company Information and Agreement for customers
    return 0; // If no role is selected, only show the role selection step
  };

  const renderNavigation = () => {
    if (activeStep === STEPS.length - 1) return null;

    const isLastStep = (role === 'customer' && activeStep === 3) || (role === 'supplier' && activeStep === 4);

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