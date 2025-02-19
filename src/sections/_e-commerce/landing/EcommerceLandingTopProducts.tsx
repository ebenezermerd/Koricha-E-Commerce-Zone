import { useState, useMemo } from 'react';
// @mui
import { 
  Box, 
  Stack, 
  Container, 
  Typography, 
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Paper,
  Alert,
} from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { useTranslate } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
//
import { EcommerceProductItemHot, EcommerceProductItemTop } from '../product/item';

// ----------------------------------------------------------------------

const SORT_OPTIONS = {
  newest: 'Newest Arrivals',
  trending: 'Trending Now',
  bestSellers: 'Best Sellers',
  featured: 'Featured',
};

export default function EcommerceLandingTopProducts() {
  const theme = useTheme();
  const { t } = useTranslate('landing');
  const [sortBy, setSortBy] = useState('trending');
  const { products, productsLoading } = useGetProducts();

  const handleChangeSort = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue) setSortBy(newValue);
  };

  const topProducts = useMemo(() => {
    if (!products) return [];

    return products
      .filter(product => {
        switch (sortBy) {
          case 'newest':
            return product.createdAt ? new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 : false; // Last 7 days
          case 'trending':
            return product.reviews.length > 100 && product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length >= 4;
          case 'bestSellers':
            return product.totalSold > 50;
          case 'featured':
            return product.rating >= 4.5 && product.totalReviews > 50 && product.inStock > 0;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0);
          case 'trending':
            return (b.reviews.length + b.rating * 20) - (a.reviews.length + a.rating * 20);
          case 'bestSellers':
            return b.totalSold - a.totalSold;
          case 'featured':
            return b.rating - a.rating;
          default:
            return 0;
        }
      })
      .slice(0, 8);
  }, [products, sortBy]);

  if (productsLoading) {
    return <TopProductsLoadingSkeleton />;
  }

  if (!products?.length || !topProducts.length) {
    return (
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 8 }}
        >
          <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
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
              {t('topProducts.title')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('topProducts.subtitle')}
            </Typography>
          </Stack>

          <ToggleButtonGroup
            exclusive
            size="small"
            value={sortBy}
            onChange={handleChangeSort}
            sx={{ bgcolor: 'background.paper' }}
          >
            {Object.entries(SORT_OPTIONS).map(([key, label]) => (
              <ToggleButton key={key} value={key}>
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        <Paper
          sx={{
            p: 5,
            borderRadius: 2,
            bgcolor: 'background.neutral',
            textAlign: 'center',
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Iconify 
              icon={
                sortBy === 'newest' ? 'solar:box-minimalistic-bold' :
                sortBy === 'trending' ? 'solar:fire-bold' :
                sortBy === 'bestSellers' ? 'solar:crown-bold' :
                'solar:star-bold'
              }
              width={80}
              height={80}
              sx={{ 
                color: 'text.disabled',
                opacity: 0.8,
              }}
            />

            <Typography variant="h5">
              No {SORT_OPTIONS[sortBy as keyof typeof SORT_OPTIONS].toLowerCase()} available
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 480 }}>
              {sortBy === 'newest' && "We're working on adding new products to our collection. Check back soon for the latest arrivals!"}
              {sortBy === 'trending' && "Be the first to discover and rate our products. Your engagement helps identify trending items!"}
              {sortBy === 'bestSellers' && "Our best sellers section is being updated. Come back soon to see what's popular!"}
              {sortBy === 'featured' && "We're carefully selecting featured products that meet our quality standards. Stay tuned!"}
            </Typography>

            <Alert 
              severity="info" 
              sx={{ 
                maxWidth: 480,
                alignItems: 'center',
                '& .MuiAlert-icon': {
                  fontSize: 28,
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Iconify 
                  icon="solar:bell-bing-bold-duotone" 
                  width={24}
                  sx={{ color: 'info.main' }}
                />
                <Typography variant="subtitle2">
                 Products are not available in the {SORT_OPTIONS[sortBy as keyof typeof SORT_OPTIONS].toLowerCase()} section.
                </Typography>
              </Stack>
            </Alert>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 8 }}
      >
         <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
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
              {t('topProducts.title')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('topProducts.subtitle')}
            </Typography>
          </Stack>

        <ToggleButtonGroup
          exclusive
          size="small"
          value={sortBy}
          onChange={handleChangeSort}
          sx={{
            bgcolor: 'background.paper',
            '& .MuiToggleButton-root': {
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            },
          }}
        >
          {Object.entries(SORT_OPTIONS).map(([key, label]) => (
            <ToggleButton 
              key={key} 
              value={key}
              disableRipple
              sx={{
                height: 40,
                whiteSpace: 'nowrap',
                transition: theme.transitions.create(['color', 'background-color'], {
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            >
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        sx={{ mb: { xs: 3, md: 8 } }}
      >
        {topProducts.slice(0, 4).map((product) => (
          <EcommerceProductItemHot 
            key={product.id} 
            product={product}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'translateY(-8px)',
                boxShadow: theme.customShadows.z24,
              },
            }}
          />
        ))}
      </Box>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <EcommerceProductItemTop 
          variant="large" 
          product={topProducts[5]} 
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: theme.customShadows.z24,
            },
          }}
        />

        <Box
          gap={3}
          display="grid"
          gridTemplateRows={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {topProducts.slice(6, 8).map((product) => (
            <EcommerceProductItemTop 
              key={product.id} 
              product={product}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.customShadows.z24,
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

// Loading Skeleton
function TopProductsLoadingSkeleton() {
  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="rectangular" width={200} height={40} />
          <Skeleton variant="rectangular" width={300} height={40} />
        </Stack>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={200} />
          ))}
        </Box>

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <Skeleton variant="rectangular" height={400} />
          <Box
            gap={3}
            display="grid"
            gridTemplateRows={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            <Skeleton variant="rectangular" height={190} />
            <Skeleton variant="rectangular" height={190} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
