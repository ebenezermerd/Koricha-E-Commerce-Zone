// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// types
import { IAddressItem } from 'src/types/address';

// ----------------------------------------------------------------------

type Props = {
  address: IAddressItem;
  action?: React.ReactNode;
};

export function AddressItem({ address, action }: Props) {
  const { name, fullAddress, phoneNumber, primary } = address;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 2,
        bgcolor: 'unset',
      }}
    >
      <Stack
        spacing={2.5}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'unset', md: 'center' }}
      >
        <Stack spacing={1} flexGrow={1}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="subtitle2">{name}</Typography>
            {primary && (
              <Box component="span" sx={{ bgcolor: 'primary.main', px: 1, borderRadius: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'common.white' }}>
                  Primary
                </Typography>
              </Box>
            )}
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {fullAddress}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {phoneNumber}
          </Typography>
        </Stack>

        {action && action}
      </Stack>
    </Paper>
  );
} 