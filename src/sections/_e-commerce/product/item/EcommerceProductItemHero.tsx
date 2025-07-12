import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, Unstable_Grid2 as Grid } from '@mui/material';
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
      <Grid xs={12} md={6} >
        <Box
          sx={{
            maxWidth: { md: 480 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Label color="warning" sx={{ mb: 2 }}>
            {label}
          </Label>

          <TextMaxLine variant="h2" sx={{ mb: 2 }}>
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
            size="large"
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
        </Box>
      </Grid>

      <Grid xs={12} md={6} >
        <Image
          src={coverImg}
          sx={{
            ...filterStyles(
              `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
            ),
            maxWidth: 600,
            height: 500,
            ml: 'auto',
            mr: { xs: 'auto', md: 'unset' },
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
