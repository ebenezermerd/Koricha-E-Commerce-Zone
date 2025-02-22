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
          placeholder="Enter your first name"
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="lastName"
          label="Last name"
          placeholder="Enter your last name"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <RHFTextField
        name="email"
        label="Enter your email address"
        placeholder="Enter email address"
        InputLabelProps={{ shrink: true }}
      />

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="phone"
          label="Enter your phone number"
          placeholder="Enter phone number"
          InputLabelProps={{ shrink: true }}
        />

        <RHFSelect
          name="sex"
          label="Select your gender"
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </RHFSelect>
      </Box>

      <RHFTextField
        name="address"
        label="Enter your address with more details to help us find you"
        placeholder="Enter your address"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  )
}

