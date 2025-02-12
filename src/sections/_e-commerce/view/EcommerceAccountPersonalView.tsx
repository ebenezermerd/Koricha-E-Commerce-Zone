import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Typography, Stack, IconButton, InputAdornment } from '@mui/material';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
//
import { EcommerceAccountLayout } from '../layout';
import { useGetUser, updateUserWithPassword } from 'src/services/useUser';
import { toast } from 'src/components/snackbar';
import LoadingScreen from 'src/components/loading-screen';
import { useProfileImage } from 'src/hooks/use-profile-image';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female'] as const;
type Gender = typeof GENDER_OPTIONS[number];

// ----------------------------------------------------------------------

const UpdateUserSchema = zod.object({
  firstName: zod.string().min(1, 'First name is required'),
  lastName: zod.string().min(1, 'Last name is required'),
  emailAddress: zod.string().email('Must be a valid email'),
  phoneNumber: zod.string().optional(),
  birthday: zod.any().optional(),
  gender: zod
    .string()
    .refine((val) => GENDER_OPTIONS.includes(val as Gender), {
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
    birthday: user.birthday || '',
    gender: user.gender && GENDER_OPTIONS.includes(user.gender as Gender) 
      ? user.gender 
      : GENDER_OPTIONS[0],
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

      await updateUserWithPassword(
        user.id,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.emailAddress,
          phoneNumber: data.phoneNumber,
          birthday: data.birthday?.toString(),
          gender: data.gender,
          streetAddress: data.streetAddress,
          city: data.city,
          zipCode: data.zipCode,
          country: data.country,
          image: pendingImage || undefined,
        },
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
        <Typography variant="h5" sx={{ mb: 3 }}>
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

          <Controller
            name="birthday"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Birthday"
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    error: !!error?.message,
                  },
                }}
                {...field}
                value={field.value}
              />
            )}
          />

          <RHFSelect 
            name="gender" 
            label="Gender"
            InputLabelProps={{ shrink: true }}
          >
            {GENDER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
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

        <Stack spacing={3} sx={{ my: 5 }}>
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
      </FormProvider>
    </EcommerceAccountLayout>
  );
}


