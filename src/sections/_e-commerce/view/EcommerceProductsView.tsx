import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// @mui
import {
  Box,
  Stack,
  Button,
  Select,
  Divider,
  MenuItem,
  Container,
  Typography,
  FormControl,
  ToggleButton,
  SelectChangeEvent,
  ToggleButtonGroup,
} from '@mui/material';
import SplashScreen from 'src/components/loading-screen';

// config
import { NAV } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
//
import { EcommerceHeader } from '../layout';
import EcommerceFilters from '../product/filters';
import { useGetProducts } from 'src/services/useProducts';
import { EcommerceProductList, EcommerceProductListBestSellers } from '../product/list';
import { EmptyContent } from 'src/components/empty-content';
// types
import { IProductFiltersProps } from 'src/types/product';
import { useTranslate } from 'src/locales';
// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'list', icon: <Iconify icon="carbon:list-boxes" /> },
  { value: 'grid', icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'top_rated', label: 'Top Rated' },
  { value: 'price_low', label: 'Price: Low-High' },
  { value: 'price_high', label: 'Price: High-Low' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductsView() {
  const { t } = useTranslate('product');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState('latest');
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [filters, setFilters] = useState<IProductFiltersProps>({
    filterBrand: [],
    filterCategories: null,
    filterColor: [],
    filterPrice: {
      start: 0,
      end: 0,
    },
    filterStock: false,
    filterShipping: [],
    filterTag: [],
    filterRating: null,
    filterGender: "",
  });

  const { products, productsLoading, productsEmpty } = useGetProducts();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    fakeLoading();
  }, []);

  const handleChangeViewMode = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleChangeView = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleFiltersChange = (newFilters: IProductFiltersProps) => {
    setFilters(newFilters);
  };

  if (productsLoading) {
    return <SplashScreen />;
  }

  if (productsEmpty) {
    return <EmptyContent title={t('no_products_found')} sx={{ py: 30 }}  />;
  }

  return (
    <>
      <EcommerceHeader />

      <Container
        maxWidth="lg"
        sx={{
          mt: 3,
          mb: 15,
          display: 'flex',
          minHeight: '80vh',
        }}
      >
        <Stack direction="row" spacing={3}>
          <EcommerceFilters
            mobileOpen={mobileOpen}
            onMobileClose={handleMobileClose}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <ToggleButtonGroup
                exclusive
                size="small"
                value={viewMode}
                onChange={handleChangeViewMode}
                sx={{ borderColor: 'transparent' }}
              >
                {VIEW_OPTIONS.map((option) => (
                  <ToggleButton key={option.value} value={option.value}>
                    {option.icon}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <FormControl size="small" hiddenLabel variant="filled" sx={{ width: 120 }}>
                <Select
                  value={sort}
                  onChange={handleChangeSort}
                  MenuProps={{
                    PaperProps: {
                      sx: { px: 1 },
                    },
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
              <EcommerceProductList
                viewMode={viewMode}
                filters={filters}
                sort={sort}
                onFiltersChange={handleFiltersChange}
              />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
