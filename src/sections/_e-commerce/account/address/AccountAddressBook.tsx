import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
// types
import { IAddressItem } from 'src/types/address';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { AddressItem } from './AddressItem';
import { AddressNewForm } from './AddressNewForm';

// ----------------------------------------------------------------------

type Props = {
  addressBook: IAddressItem[];
  onAddAddress: (address: IAddressItem) => void;
  onEditAddress: (address: IAddressItem) => void;
  onDeleteAddress: (id: string) => void;
};

export function AccountAddressBook({ 
  addressBook, 
  onAddAddress, 
  onEditAddress, 
  onDeleteAddress 
}: Props) {
  const [addressId, setAddressId] = useState<string | null>(null);

  const popover = usePopover();
  const addressForm = useBoolean();

  const currentAddress = addressBook.find((address) => address.id === addressId);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, id: string) => {
    popover.onOpen(event);
    setAddressId(id);
  };

  const handleCreateAddress = (address: IAddressItem) => {
    onAddAddress(address);
    addressForm.onFalse();
  };

  const handleEditAddress = (address: IAddressItem) => {
    onEditAddress(address);
    addressForm.onFalse();
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Address Book"
          action={
            <Button
              onClick={addressForm.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add New Address
            </Button>
          }
        />

        <Stack spacing={3} sx={{ p: 3 }}>
          {addressBook.map((address) => (
            <Box key={address.id}>
              <AddressItem
                address={address}
                action={
                  <IconButton
                    onClick={(event) => handleOpenPopover(event, address.id!)}
                  >
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                }
              />
            </Box>
          ))}
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorEl={popover.anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            addressForm.onTrue();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDeleteAddress(addressId!);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        onCreate={handleCreateAddress}
        onEdit={handleEditAddress}
        address={currentAddress}
      />
    </>
  );
} 