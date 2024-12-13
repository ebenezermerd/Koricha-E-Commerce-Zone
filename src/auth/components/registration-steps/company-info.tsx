import Box from '@mui/material/Box'
import { RHFTextField } from 'src/components/hook-form'

export function CompanyInfoStep() {
  return (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="companyName"
          label="Company Name"
          placeholder="Enter company name"
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="description"
          label="Description"
          placeholder="Enter company description"
          multiline
          rows={1}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="companyEmail"
          label="Company Email"
          placeholder="Enter company email"
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="companyPhone"
          label="Company Phone"
          placeholder="Enter company phone"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
        <RHFTextField
          name="country"
          label="Country/Region"
          placeholder="Enter country"
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="city"
          label="City"
          placeholder="Enter city"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <RHFTextField
        name="companyAddress"
        label="Address"
        placeholder="Enter company address"
        multiline
        rows={3}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  )
}

