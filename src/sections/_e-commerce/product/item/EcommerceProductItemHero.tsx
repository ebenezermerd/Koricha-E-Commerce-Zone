import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, Unstable_Grid2 as Grid, Paper } from '@mui/material';
// utils
import { filterStyles } from 'src/utils/cssStyles';
// routes
import { paths } from 'src/routes/paths';
// types
import { IProductItemHeroProps } from 'src/types/product';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItemHeroProps;
};

export default function EcommerceProductItemHero({ product }: Props) {
  const productPath = paths.eCommerce.product.replace(':id', product.id);
  const theme = useTheme();

  const { label, title, caption, coverImg } = product;
  return (
    <Grid
      container
      rowSpacing={{
        xs: 4,
        md: 0,
      }}
      sx={{
        height: '100%',
        alignItems: 'center',
        py: 5,
        mx: { xs: 0, md: 20 },
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: { md: 480 },
            textAlign: { xs: 'center', md: 'unset' },
            p: 3,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.default, 0.9),
            backdropFilter: 'blur(8px)',
            boxShadow: theme.customShadows.z8,
          }}
        >
          <Label color="warning" sx={{ mb: 2 }}>
            {label}
          </Label>

          <TextMaxLine 
            variant="h2" 
            sx={{ 
              mb: 2, 
              fontWeight: 900, 
              letterSpacing: '-0.5px',
              fontSize: { xs: '2rem', md: '2.75rem' },
              textTransform: 'uppercase',
              color: 'text.primary',
              textShadow: `1px 1px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
              lineHeight: 1.2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: { xs: 'calc(50% - 40px)', md: 0 },
                width: 80,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 1
              }
            }}
          >
            {title}
          </TextMaxLine>

          <TextMaxLine 
            variant="body1" 
            sx={{ 
              mb: { xs: 3, md: 5 }, 
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.15rem' } 
            }}
          >
            {caption}
          </TextMaxLine>

          <Button
            component={RouterLink}
            to={productPath}
            size="medium"
            color="primary"
            variant="contained"
            endIcon={<Iconify icon="carbon:chevron-right" />}
            sx={{
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: theme.customShadows.z8,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Shop Now
          </Button>
        </Paper>
      </Grid>

      <Grid xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: { xs: 350, md: 500 },
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 280, md: 320 },
              height: { xs: 280, md: 320 },
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.background.default, 0.8),
              backdropFilter: 'blur(8px)',
              boxShadow: `0 0 40px ${alpha(theme.palette.common.white, 0.2)}`,
              zIndex: 0,
            }}
          />
          
          <Image
            src={coverImg}
            sx={{
              ...filterStyles(
                `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
              ),
              maxWidth: { xs: 280, md: 500 },
              maxHeight: { xs: 280, md: 500 },
              objectFit: 'contain',
              zIndex: 1,
              transition: 'transform 0.5s ease-in-out',
              '&:hover': {
                transform: 'scale(1.08) rotate(2deg)',
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
