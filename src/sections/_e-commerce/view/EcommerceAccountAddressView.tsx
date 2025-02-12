import { useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IAddressItem } from 'src/types/address';
// components
import { useGetAddresses, useAddAddress, useUpdateAddress, useDeleteAddress } from 'src/services/useAddress';
import LoadingScreen from 'src/components/loading-screen';
import { toast } from 'src/components/snackbar';
// sections
import { AccountAddressBook } from '../account/address/AccountAddressBook';
import { EcommerceAccountLayout } from '../layout';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function EcommerceAccountAddressView() {
  const { addresses, isLoading } = useGetAddresses();
  const { addAddress } = useAddAddress();
  const { updateAddress } = useUpdateAddress();
  const { deleteAddress } = useDeleteAddress();
  const addressForm = useBoolean();

  const handleAddAddress = useCallback(
    async (address: IAddressItem) => {
      try {
        await addAddress(address);
        toast.success('Address added successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to add address');
      }
    },
    [addAddress]
  );

  const handleEditAddress = useCallback(
    async (address: IAddressItem) => {
      try {
        if (!address.id) throw new Error('Address ID is required');
        await updateAddress(address.id, address);
        toast.success('Address updated successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to update address');
      }
    },
    [updateAddress]
  );

  const handleDeleteAddress = useCallback(
    async (addressId: string) => {
      try {
        await deleteAddress(addressId);
        toast.success('Address deleted successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete address');
      }
    },
    [deleteAddress]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <EcommerceAccountLayout>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Address Book
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12}>
          <AccountAddressBook
            addressBook={addresses}
            onAddAddress={handleAddAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        </Grid>
      </Grid>
    </EcommerceAccountLayout>
  );
} 