import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { RHFTextField } from 'src/components/hook-form'

export function RoleSelectionStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <RHFTextField
        name="role"
        label="Select Your Role"
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="supplier">Supplier</MenuItem>
      </RHFTextField>
    </Box>
  )
}

