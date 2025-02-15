// @mui
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
// types
import { IAddressItem } from 'src/types/address';
// components
import Iconify from 'src/components/iconify';
import { AddressItem } from '../account/address/AddressItem';

// ----------------------------------------------------------------------

type Props = {
  billing: IAddressItem | null;
  onBackStep: VoidFunction;
};

export function CheckoutBillingInfo({ billing, onBackStep }: Props) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={onBackStep}
          >
            Edit
          </Button>
        }
      />

      {billing && <AddressItem address={billing} />}
    </Card>
  );
} 