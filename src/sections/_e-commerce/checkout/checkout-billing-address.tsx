import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
// hooks
import { useGetAddresses } from 'src/services/useAddress';
// components
import Iconify from 'src/components/iconify';
import { useCheckout } from './context/checkout-context';
import { AddressItem } from '../account/address/AddressItem';
import { AddressNewForm } from '../account/address/AddressNewForm';
import LoadingScreen from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';

import { IAddressItem } from 'src/types/address';

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  const { addresses, isLoading } = useGetAddresses();
  const checkout = useCheckout();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Billing Address"
          action={
            <Button
              size="small"
              color="inherit"
              onClick={handleOpen}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Address
            </Button>
          }
        />

        <Stack spacing={3} sx={{ p: 3 }}>
          {addresses?.length ? (
            addresses.map((address: IAddressItem) => (
              <Box key={address.id}>
                <AddressItem
                  address={address}
                  action={
                    <Stack spacing={1} direction="row">
                      <Button
                        size="small"
                        variant={checkout.billing?.id === address.id ? 'contained' : 'outlined'}
                        color="inherit"
                        onClick={() => checkout.onCreateBilling(address)}
                      >
                        {checkout.billing?.id === address.id ? 'Selected' : 'Select'}
                      </Button>
                    </Stack>
                  }
                />
              </Box>
            ))
          ) : (
            <EmptyContent
              title="No Addresses Found"
              description="Please add a new address to proceed with billing"
              imgUrl="/assets/icons/empty/ic_address.svg"
              sx={{ py: 3 }}
            />
          )}
        </Stack>
      </Card>

      <Stack direction="row" justifyContent="space-between">
        <Button
          color="inherit"
          onClick={checkout.onBackStep}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={checkout.onNextStep}
          disabled={!checkout.billing}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Continue
        </Button>
      </Stack>

      <AddressNewForm
        open={open}
        onEdit={(address) => {
          checkout.onCreateBilling(address);
          handleClose();
        }}
        onClose={handleClose}
        onCreate={(address) => {
          checkout.onCreateBilling(address);
          handleClose();
        }}
      />
    </>
  );
} 