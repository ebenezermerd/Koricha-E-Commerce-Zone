import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
// @mui
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
// types
import { IAddressItem } from 'src/types/address';
// components
import FormProvider, { RHFTextField, RHFSelect, RHFCheckbox } from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import { toast } from 'src/components/snackbar';
import { useAddAddress, useUpdateAddress } from 'src/services/useAddress';
import { add } from 'date-fns';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreate: (address: IAddressItem) => void;
  onEdit: (address: IAddressItem) => void;
  address?: IAddressItem | null;
};

// ----------------------------------------------------------------------

const ADDRESS_TYPES = [
  { value: 'Home', label: 'Home' },
  { value: 'Office', label: 'Office' },
  { value: 'Other', label: 'Other' }
];

export const AddressSchema = zod.object({
  address: zod.string().min(1, 'Address is required'),
  city: zod.string().min(1, 'City is required'),
  state: zod.string().min(1, 'State is required'),
  country: zod.string().min(1, 'Country is required'),
  primary: zod.boolean().default(false),
  addressType: zod.string()
    .transform(val => val.toLowerCase())
    .pipe(zod.enum(['home', 'office', 'other']))
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1))
    .default('Home'),
});

type FormValuesProps = zod.infer<typeof AddressSchema>;

// ----------------------------------------------------------------------

export function AddressNewForm({ open, onClose, onCreate, onEdit, address }: Props) {
  const { updateAddress } = useUpdateAddress();
  const isEdit = Boolean(address);
  const { addAddress } = useAddAddress();
  const defaultValues: FormValuesProps = {
    address: '',
    city: '',
    state: '',
    country: '',
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
        const [streetAddress, city, state, country] = addressParts;

        reset({
          address: streetAddress || '',
          city: city || '',
          state: state || '',
          country: country || '',
          primary: address.primary || false,
          addressType: (() => {
            const type = address.addressType?.toLowerCase();
            return type === 'home' ? 'Home' :
                   type === 'office' ? 'Office' :
                   type === 'other' ? 'Other' : 'Home';
          })(),
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
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}`,
        addressType: data.addressType,
        primary: data.primary,
      };

      if (isEdit) {
        await updateAddress(addressData.id!, addressData);
        onEdit(addressData);
        toast.success('Address updated successfully');
      } else {
        const createdAddress = await addAddress(addressData);
        onCreate(createdAddress);
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
    <Dialog 
      fullWidth 
      maxWidth="md" 
      open={open} 
      onClose={handleClose}
      PaperProps={{
        sx: { maxHeight: '90vh', width: '80%', maxWidth: '1000px' },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{isEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid xs={12}>
              <RHFTextField name="address" label="Write your address here with more details " />
            </Grid>

            <Grid xs={12} sm={6}>
              <RHFTextField name="city" label="City" />
            </Grid>

            <Grid xs={12} sm={6}>
              <RHFTextField name="state" label="State/Region" />
            </Grid>

            <Grid xs={12} sm={6}>
              <RHFSelect 
                name="country" 
                label="Country"
                native
                sx={{
                  '& .MuiSelect-select': {
                    padding: '13px 24px',
                  }
                }}
              >
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>

            <Grid xs={12} sm={6}>
              <RHFSelect 
                name="addressType" 
                label="Address Type"
                native
                sx={{
                  '& .MuiSelect-select': {
                    padding: '13px 24px',
                  }
                }}
              >
                {ADDRESS_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>

            <Grid xs={12}>
              <RHFCheckbox name="primary" label="Set as primary address" />
            </Grid>
          </Grid>
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