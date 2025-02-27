import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { RHFTextField, RHFSelect, RHFPhoneInput } from 'src/components/hook-form'

export function BasicInfoStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2}>
        <RHFTextField
          name="firstName"
          label="First name"
          placeholder="Enter your first name"
          InputLabelProps={{ shrink: true }}
          size="medium"
          variant="outlined"
        />

        <RHFTextField
          name="middleName"
          label="Middle name"
          placeholder="Enter your middle name"
          InputLabelProps={{ shrink: true }}
          size="medium"
          variant="outlined"
        />

        <RHFTextField
          name="lastName"
          label="Last name"
          placeholder="Enter your last name"
          InputLabelProps={{ shrink: true }}
          size="medium"
          variant="outlined"
        />
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="email"
          label="Email"
          placeholder="Enter your email"
          InputLabelProps={{ shrink: true }}
          size="medium"
          variant="outlined"
        />

        <RHFPhoneInput
          name="phone"
          label="Phone number"
          size="medium"
          variant="outlined"
        />
      </Box>

      <Box display="grid" gridTemplateColumns="1fr" gap={2}>
        <RHFSelect
          name="sex"
          label="Sex"
          InputLabelProps={{ shrink: true }}
          size="medium"
          variant="outlined"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </RHFSelect>
      </Box>

      <RHFTextField
        name="address"
        label="Address"
        placeholder="Enter your address"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
        size="medium"
        variant="outlined"
      />
    </Box>
  )
}

