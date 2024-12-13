import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { RHFTextField, RHFSelect } from 'src/components/hook-form'

export function BasicInfoStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="firstName"
          label="First name"
          placeholder="Enter first name"
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="lastName"
          label="Last name"
          placeholder="Enter last name"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <RHFTextField
        name="email"
        label="Email address"
        placeholder="Enter email address"
        InputLabelProps={{ shrink: true }}
      />

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="phone"
          label="Phone"
          placeholder="Enter phone number"
          InputLabelProps={{ shrink: true }}
        />

        <RHFSelect
          name="sex"
          label="Sex"
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </RHFSelect>
      </Box>

      <RHFTextField
        name="address"
        label="Address"
        placeholder="Enter your address"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  )
}

