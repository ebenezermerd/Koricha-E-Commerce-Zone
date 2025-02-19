import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Typography, Stack, IconButton, InputAdornment, Card, MenuItem } from '@mui/material';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFDatePicker } from 'src/components/hook-form';
//
import { EcommerceAccountLayout } from '../layout';
import { useGetUser, updateUserWithPassword } from 'src/services/useUser';
import { toast } from 'src/components/snackbar';
import LoadingScreen from 'src/components/loading-screen';
import { useProfileImage } from 'src/hooks/use-profile-image';
import { parseISO, format } from 'date-fns';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

type Gender = (typeof GENDER_OPTIONS)[number]['value'];

// ----------------------------------------------------------------------

const UpdateUserSchema = zod.object({
  firstName: zod.string().min(1, 'First name is required'),
  lastName: zod.string().min(1, 'Last name is required'),
  emailAddress: zod.string().email('Must be a valid email'),
  phoneNumber: zod.string().optional(),
  birthdate: zod.any().optional(),
  gender: zod
    .string()
    .refine((val) => GENDER_OPTIONS.map(opt => opt.value).includes(val as Gender), {
      message: 'Please select either Male or Female',
    }),
  streetAddress: zod.string().optional(),
  city: zod.string().optional(),
  zipCode: zod.string().optional(),
  country: zod.string().optional(),
  // Make password fields optional but validate them as a group
  oldPassword: zod.string().optional(),
  newPassword: zod.string().optional(),
  confirmNewPassword: zod.string().optional(),
}).refine((data) => {
  // If any password field is filled, all password fields must be filled
  const hasAnyPassword = data.newPassword || data.confirmNewPassword;
  const hasAllPasswords = data.newPassword && data.confirmNewPassword;
  
  if (hasAnyPassword && !hasAllPasswords) {
    return false;
  }
  
  // If passwords are provided, validate they match
  if (hasAllPasswords && data.newPassword !== data.confirmNewPassword) {
    return false;
  }
  
  return true;
}, {
  message: "All password fields must be filled and new passwords must match",
  path: ['newPassword'], // This will show the error under the newPassword field
});

// First, let's update the type for the user data
interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthdate: string | null; // Changed from birthday to birthdate
  gender: string;
  streetAddress?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  image?: File;
}

export default function EcommerceAccountPersonalView() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, userLoading, revalidateUser } = useGetUser();
  const { pendingImage, setPendingImage } = useProfileImage();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Wait for user data to load
  if (userLoading || !user) {
    return <LoadingScreen />;
  }

  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.email,
    phoneNumber: user.phoneNumber,
    birthdate: user.birthdate ? new Date(user.birthdate).toISOString() : null, // Use birthdate from user but store as birthdate
    gender: user.gender 
      ? GENDER_OPTIONS.find(opt => opt.value.toLowerCase() === user.gender?.toLowerCase())?.value || GENDER_OPTIONS[0].value
      : GENDER_OPTIONS[0].value,
    streetAddress: user.streetAddress,
    zipCode: user.zipCode,
    city: user.city,
    country: user.country,
    about: user.about || '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      if (!user?.id) return;

      const passwordData = data.oldPassword && data.newPassword && data.confirmNewPassword
        ? {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
          }
        : undefined;

      // Format the date to YYYY-MM-DD format for MySQL
      const formattedBirthdate = data.birthdate 
        ? format(new Date(data.birthdate), 'yyyy-MM-dd')
        : null;

      const userData: UpdateUserData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.emailAddress,
        phoneNumber: data.phoneNumber,
        birthdate: formattedBirthdate, // Use birthdate here
        gender: data.gender,
        streetAddress: data.streetAddress,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
        image: pendingImage || undefined,
      };

      await updateUserWithPassword(
        user.id,
        userData,
        passwordData
      );

      await revalidateUser();
      toast.success('Profile updated successfully');
      
      // Reset password fields and pending image
      methods.reset({
        ...methods.getValues(),
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setPendingImage(null);
    } catch (error) {
      let errorMessage = 'Failed to update profile';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      console.error(error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <EcommerceAccountLayout>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 2 }} >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Personal
        </Typography>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <RHFTextField name="firstName" label="First Name" />

          <RHFTextField name="lastName" label="Last Name" />

          <RHFTextField name="emailAddress" label="Email Address" />

          <RHFTextField name="phoneNumber" label="Phone Number" />

          <RHFDatePicker
            name="birthdate"
            label="Birth Date"
          />

          <RHFSelect 
            name="gender" 
            label="Gender"
            InputLabelProps={{ shrink: true }}
          >
            {GENDER_OPTIONS.map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
                sx={{ 
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFTextField name="streetAddress" label="Street Address" />

          <RHFTextField name="zipCode" label="Zip Code" />

          <RHFTextField name="city" label="City" />

          <RHFSelect native name="country" label="Country">
            <option value="" />
            {countries.map((country) => (
              <option key={country.code} value={country.label}>
                {country.label}
              </option>
            ))}
          </RHFSelect>
        </Box>
        </Card>
     <Card sx={{ mt: 2 , p: 2 }} >
        <Stack spacing={3} sx={{ mb: 2 }}>
          <Typography variant="h5"> Change Password </Typography>
          <Stack spacing={2.5}>
            <RHFTextField
              name="oldPassword"
              label="Old Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="newPassword"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="confirmNewPassword"
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <LoadingButton
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Changes
        </LoadingButton>
      </Card>
      </FormProvider>
    </EcommerceAccountLayout>
  );
}
