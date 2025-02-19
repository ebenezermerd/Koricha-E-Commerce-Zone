import { useState } from 'react';
// @mui
import { 
  Box, 
  Tab, 
  Tabs, 
  Stack, 
  Card,
  Alert,
  Skeleton, 
  Container, 
  Typography,
  useTheme,
} from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { useTranslate } from 'src/locales';
//
import { EcommerceProductItemBestSellers } from '../product/item';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const TABS = [
  { 
    value: 'featured',
    label: 'Featured Products',
    icon: 'solar:star-bold',
    filter: (product: any) => product.rating >= 4 && product.totalSold > 10
  },
  { 
    value: 'topRated',
    label: 'Top Rated Products',
    icon: 'solar:stars-bold',
    filter: (product: any) => product.rating >= 4.5
  },
  { 
    value: 'onSale',
    label: 'On Sale Products',
    icon: 'solar:tag-price-bold',
    filter: (product: any) => product.priceSale > 0 && product.saleLabel.enabled
  },
];

// ----------------------------------------------------------------------

export default function EcommerceLandingPopularProducts() {
  const theme = useTheme();
  const { t } = useTranslate('landing');
  const [currentTab, setCurrentTab] = useState('featured');
  const { products, productsLoading } = useGetProducts();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  // Get filtered products based on current tab
  const filteredProducts = products
    ?.filter(product => {
      const tab = TABS.find(tab => tab.value === currentTab);
      return tab?.filter(product);
    })
    .sort((a, b) => {
      // Sort by different criteria based on tab
      switch (currentTab) {
        case 'featured':
          return b.totalSold - a.totalSold;
        case 'topRated':
          return b.rating - a.rating;
        case 'onSale':
          return (b.price - b.priceSale) - (a.price - a.priceSale);
        default:
          return 0;
      }
    })
    .slice(0, 8);

  const currentTabData = TABS.find(tab => tab.value === currentTab);

  if (productsLoading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={3}>
        {/* Header Section */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'center', md: 'flex-end' }}
          justifyContent="space-between"
          spacing={2}
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
              {t('popular.title')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('popular.subtitle')}
            </Typography>
          </Stack>

          <Card sx={{ bgcolor: 'background.neutral' }}>
            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              sx={{
                px: 1,
                '& .MuiTab-root': {
                  minWidth: 'auto',
                  px: 3,
                  py: 1.5,
                  fontWeight: 'fontWeightMedium',
                  '&.Mui-selected': {
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                  },
                },
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  icon={<Iconify icon={tab.icon} width={20} sx={{ mr: 1 }} />}
                  label={tab.label}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Card>
        </Stack>

        {/* Products Grid */}
        {filteredProducts?.length > 0 ? (
          <Box
            gap={3}
            
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                sx={{
                  height: '100%',
                  
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.customShadows.z24,
                  },
                }}
              >
                <EcommerceProductItemBestSellers 
                  product={product}
                  sx={{
                    p: 3,
                    
                    height: '100%',
                  }} 
                />
              </Card>
            ))}
          </Box>
        ) : (
          <Card
            sx={{
              p: 5,
              textAlign: 'center',
              bgcolor: 'background.neutral',
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Iconify 
                icon={currentTabData?.icon || 'solar:box-minimalistic-bold'} 
                width={64}
                sx={{ color: 'text.disabled' }}
              />
              <Typography variant="h6">
                No {currentTabData?.label.toLowerCase()} available yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                More products will be added soon. Stay tuned!
              </Typography>
              <Alert severity="info" sx={{ maxWidth: 480 }}>
                New products are being added to our collection. Check back later for {currentTabData?.label.toLowerCase()}.
              </Alert>
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

// Loading Skeleton
function ProductsLoadingSkeleton() {
  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Skeleton variant="rectangular" width={200} height={80} />
          <Skeleton variant="rectangular" width={300} height={40} />
        </Stack>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={200} />
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
