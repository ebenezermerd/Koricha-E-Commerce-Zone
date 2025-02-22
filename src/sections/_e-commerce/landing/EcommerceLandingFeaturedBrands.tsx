import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  Container,
  Typography,
  StackProps,
  Unstable_Grid2 as Grid,
  Skeleton,
} from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { useTranslate } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
//
import { EcommerceProductItemFeaturedByBrand } from '../product/item';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function EcommerceLandingFeaturedBrands() {
  const theme = useTheme();
  const { t } = useTranslate('landing');
  const { products, productsLoading } = useGetProducts();
  const navigate = useNavigate();

  // Group products by brand and get top brands
  const topBrands = products
    ? Object.entries(
        products.reduce((acc: Record<string, { products: any[]; totalSales: number; description: string }>, product) => {
          const brand = product.brand || 'Other';
          if (!acc[brand.name]) {
            acc[brand.name] = {
              products: [],
              totalSales: 0,
              description: product.brand.description || getDefaultBrandDescription(brand.description),
            };
          }
          acc[brand.name].products.push(product);
          acc[brand.name].totalSales += product.totalSold || 0;
          return acc;
        }, {} as Record<string, { products: any[]; totalSales: number; description: string }>)
      )
        .sort(([, a], [, b]) => b.totalSales - a.totalSales)
        .slice(0, 1)
    : [];

  if (productsLoading) {
    return (
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  if (!topBrands.length) {
    return null;
  }

  const [featuredBrand, brandData] = topBrands[0];
  const featuredProducts = brandData.products
    .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
    .slice(0, 4);

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack spacing={1} sx={{ mb: 4 }} alignItems={{ xs: 'center', md: 'flex-start' }}>
        <Typography
          variant="h3"
          sx={{
            background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
          }}
        >
          {t('brands.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('brands.subtitle')}
        </Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <BrandInfo
            name={featuredBrand}
            description={brandData.description}
            path={`/brand/${featuredBrand.toLowerCase()}`}
            totalProducts={brandData.products.length}
            totalSales={brandData.totalSales}
            sx={{ 
              height: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
              },
            }}
          />
        </Grid>

        <Grid xs={12} md={8}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            {featuredProducts.map((product) => (
              <EcommerceProductItemFeaturedByBrand 
                key={product.id} 
                product={product}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.customShadows.z16,
                  },
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

interface BrandInfoProps extends StackProps {
  name: string;
  path: string;
  description: string;
  totalProducts: number;
  totalSales: number;
}

function BrandInfo({ 
  name, 
  description, 
  path, 
  totalProducts,
  totalSales,
  sx, 
  ...other 
}: BrandInfoProps) {
  const theme = useTheme();
  const { t } = useTranslate('landing');
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to products page with brand filter
    navigate(`${paths.eCommerce.products}`);
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 5,
        borderRadius: 2,
        textAlign: 'center',
        bgcolor: 'background.neutral',
        boxShadow: theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          mb: 1, 
          fontWeight: 'bold', 
          color: theme.palette.primary.main,
          textTransform: 'uppercase',
          letterSpacing: 0,
        }}
      >
        {name}
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          minHeight: 48,
        }}
      >
        {description}
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          my: 3,
          px: 3,
          py: 2,
          width: 1,
          borderRadius: 1,
          bgcolor: 'background.default',
        }}
      >
        <Stack spacing={0.5} alignItems="center">
          <Typography variant="h6">{totalProducts}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('brands.products')}
          </Typography>
        </Stack>

        <Stack spacing={0.5} alignItems="center">
          <Typography variant="h6">{totalSales}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {t('brands.sales')}
          </Typography>
        </Stack>
      </Stack>

      <Button
        onClick={handleViewDetails}
        color="inherit"
        variant="outlined"
        endIcon={<Iconify icon="carbon:chevron-right" />}
        sx={{
          borderColor: (theme) => alpha(theme.palette.grey[500], 0.24),
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        {t('brands.viewAll')}
      </Button>
    </Stack>
  );
}

// Helper functions
function getDefaultBrandDescription(brand: string) {
  return `${brand} is a leading brand in our store, offering high-quality products and innovative solutions for our customers.`;
}
