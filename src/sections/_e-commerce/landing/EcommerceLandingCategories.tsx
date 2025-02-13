import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Typography, Container, Stack, Link } from '@mui/material';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
// config
import { productConfig } from 'src/config/product-options';

// ----------------------------------------------------------------------

export default function EcommerceLandingCategories() {
  const categories = productConfig.landing.categories.flatMap(group => group.items);

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Categories
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(6, 1fr)',
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.label}
            component={RouterLink}
            to={category.path}
            underline="none"
            color="inherit"
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                px: 1,
                py: 3,
                borderRadius: 2,
                cursor: 'pointer',
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                '&:hover': {
                  boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
                },
              }}
            >
              <Box sx={{ mb: 2, p: 1.5, bgcolor: 'background.neutral', borderRadius: '50%' }}>
                <Image src={category.icon} sx={{ width: 40, height: 40 }} />
              </Box>

              <TextMaxLine variant="subtitle2" line={1}>
                {category.label}
              </TextMaxLine>
            </Stack>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
