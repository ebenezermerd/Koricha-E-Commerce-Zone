import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { RHFTextField } from 'src/components/hook-form'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify  from 'src/components/iconify'

export function PasswordStep() {
  const password = useBoolean()
  const password_confirmation = useBoolean()

  return (
    <Box gap={3} display="flex" flexDirection="column">
      <RHFTextField
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="password_confirmation"
        label="Confirm Password"
        placeholder="6+ characters"
        type={password_confirmation.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password_confirmation.onToggle} edge="end">
                <Iconify icon={password_confirmation.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

