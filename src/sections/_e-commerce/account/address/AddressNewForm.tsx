import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
// @mui
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
// types
import { IAddressItem } from 'src/types/address';
// components
import FormProvider, { RHFTextField, RHFSelect, RHFCheckbox } from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreate: (address: IAddressItem) => void;
  onEdit: (address: IAddressItem) => void;
  address?: IAddressItem | null;
};

// ----------------------------------------------------------------------

export const AddressSchema = zod.object({
  name: zod.string().min(1, 'Name is required'),
  phoneNumber: zod.string().refine((val) => {
    if (!val) return true;
    
    // Remove any spaces or special characters
    const cleaned = val.replace(/\s+/g, '');

    // Check for international format (+251)
    if (cleaned.startsWith('+251')) {
      return cleaned.length === 13 && /^\+251[79]\d{8}$/.test(cleaned);
    }
    
    // Check for 10 digit format (09/07)
    if (cleaned.length === 10) {
      return /^0[79]\d{8}$/.test(cleaned);
    }
    
    // Check for 9 digit format (9/7)
    if (cleaned.length === 9) {
      return /^[79]\d{8}$/.test(cleaned);
    }

    return false;
  }, {
    message: 'Phone number must be either:\n- 10 digits starting with 09/07\n- 9 digits starting with 9/7\n- International format +251 followed by 9 digits',
  }),
  email: zod.string().email('Must be a valid email'),
  address: zod.string().min(1, 'Address is required'),
  city: zod.string().min(1, 'City is required'),
  state: zod.string().min(1, 'State is required'),
  country: zod.string().min(1, 'Country is required'),
  zipCode: zod.string().min(1, 'Zip code is required'),
  primary: zod.boolean().default(false),
  addressType: zod.enum(['Home', 'Office', 'Other']).default('Home'),
});

type FormValuesProps = zod.infer<typeof AddressSchema>;

// ----------------------------------------------------------------------

export function AddressNewForm({ open, onClose, onCreate, onEdit, address }: Props) {
  const isEdit = Boolean(address);

  const defaultValues: FormValuesProps = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    primary: false,
    addressType: 'Home',
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(AddressSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (address) {
      try {
        const addressParts = address.fullAddress?.split(', ') || [];
        const [streetAddress, city, state, country, zipCode] = addressParts;

        reset({
          name: address.name || '',
          email: address.email || '',
          phoneNumber: address.phoneNumber || '',
          address: streetAddress || '',
          city: city || '',
          state: state || '',
          country: country || '',
          zipCode: zipCode || '',
          primary: address.primary || false,
          addressType: (address.addressType as 'Home' | 'Office' | 'Other') || 'Home',
        });
      } catch (error) {
        console.error('Error parsing address:', error);
        toast.error('Failed to load address details');
      }
    }
  }, [address, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const addressData: IAddressItem = {
        id: address?.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
        addressType: data.addressType,
        primary: data.primary,
      };

      if (isEdit) {
        onEdit(addressData);
        toast.success('Address updated successfully');
      } else {
        onCreate(addressData);
        toast.success('Address added successfully');
      }

      onClose();
      reset(defaultValues);
    } catch (error) {
      console.error('Error submitting address:', error);
      toast.error(isEdit ? 'Failed to update address' : 'Failed to add address');
    }
  });

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{isEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="phoneNumber" label="Phone Number" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="state" label="State/Region" />
            
            <RHFSelect native name="country" label="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField name="zipCode" label="Zip/Code" />
            
            <RHFSelect native name="addressType" label="Address Type">
              {['Home', 'Office', 'Other'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </RHFSelect>

            <RHFCheckbox name="primary" label="Set as primary address" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {isEdit ? 'Save Changes' : 'Add Address'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
} 