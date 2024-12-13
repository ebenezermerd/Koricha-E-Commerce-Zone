import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { paths } from 'src/routes/paths'
import { RouterLink } from 'src/routes/components'

export function SuccessStep() {
  return (
    <Box 
      gap={3} 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      textAlign="center"
    >
      <Typography variant="h4" color="primary">
        You are successfully registered
      </Typography>
      
      <Typography variant="body1" color="text.secondary">
        Please wait until our team review and approve.
      </Typography>

      <Typography variant="body2">
        You can login and access our page.{' '}
        <Link component={RouterLink} href={paths.auth.jwt.signIn}>
          Login
        </Link>
      </Typography>
    </Box>
  )
}

