// @mui
import { Box, Stack, Pagination, Typography } from '@mui/material';
// types
import { IProductItemProps, IProductFiltersProps } from 'src/types/product';
//
import {
  EcommerceProductViewListItem,
  EcommerceProductViewGridItem,
  EcommerceProductViewListItemSkeleton,
  EcommerceProductViewGridItemSkeleton,
} from '../item';
import { useTranslate } from 'src/locales';
import { EmptyContent } from 'src/components/empty-content';
import { useProductFilter, useCategories, Category } from 'src/hooks/useProductFilter';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


// ----------------------------------------------------------------------

type Props = {
  viewMode: string;
  filters: IProductFiltersProps;
  sort: string;
  onFiltersChange: (newFilters: IProductFiltersProps) => void;
};

// Local filtering for non-category/brand filters
const applyLocalFilters = (products: IProductItemProps[], filters: IProductFiltersProps) => {
  if (!products) return [];

  return products.filter(product => {
    // Only apply color filter if colors are selected
    if (filters.filterColor && filters.filterColor.length > 0) {
      if (!filters.filterColor.some(color => product.colors.includes(color))) {
        return false;
      }
    }

    // Only apply price filter if either start or end is set
    if (filters.filterPrice && (filters.filterPrice.start > 0 || filters.filterPrice.end > 0)) {
      const price = product.priceSale || product.price;
      if (filters.filterPrice.start > 0 && price < filters.filterPrice.start) {
        return false;
      }
      if (filters.filterPrice.end > 0 && price > filters.filterPrice.end) {
        return false;
      }
    }

    // Only apply gender filter if it's set
    if (filters.filterGender && filters.filterGender !== '') {
      if (!product.gender.includes(filters.filterGender)) {
        return false;
      }
    }

    // Only apply stock filter if it's true
    if (filters.filterStock === true) {
      const inventoryStatus = product.inventoryType;
      if (inventoryStatus === 'out_of_stock' || inventoryStatus === 'discontinued') {
        return false;
      }
    }

    // Only apply rating filter if it's set
    if (filters.filterRating && filters.filterRating !== null) {
      if (product.rating < Number(filters.filterRating)) {
        return false;
      }
    }

    return true;
  });
};

export default function EcommerceProductList({ viewMode, filters, sort, onFiltersChange }: Props) {
  const { t } = useTranslate('product');
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const { categories: categoriesFromHook } = useCategories();
  const { products, meta, isLoading } = useProductFilter(filters, sort, page, viewMode);

  // Reset page when view mode changes
  useEffect(() => {
    setPage(1);
  }, [viewMode]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add debug logging to track filter application
  useEffect(() => {
    console.debug('Products before local filtering:', products?.length);
    const filtered = applyLocalFilters(products, filters);
    console.debug('Products after local filtering:', filtered.length);
    console.debug('Applied filters:', {
      colors: filters.filterColor?.length ?? 0 > 0,
      price: filters.filterPrice && (filters.filterPrice.start > 0 || filters.filterPrice.end > 0),
      gender: !!filters.filterGender,
      stock: filters.filterStock,
      rating: !!filters.filterRating
    });
  }, [products, filters]);

  // Handle URL parameters and category changes...
  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId && (!filters.filterCategories || categoryId !== filters.filterCategories.id.toString())) {
      const category = findCategoryById(categoriesFromHook, parseInt(categoryId));
      if (category) {
        onFiltersChange({
          ...filters,
          filterCategories: category,
          filterBrand: [],
        });
      }
    }
  }, [searchParams, categoriesFromHook]);

  // Apply remaining filters locally
  const filteredProducts = applyLocalFilters(products, filters);

  if (isLoading) {
    return (
      <Box
        gap={3}
        display="grid"
        sx={{ minWidth: '800px', md: { minWidth: '1200px' }, lg: { minWidth: '1600px' }, }}
        gridTemplateColumns={viewMode === 'grid' 
          ? { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)' }
          : '1fr'
        }
      >
        {[...Array(12)].map((_, index) => (
          <Box key={index}>
            {viewMode === 'grid' ? (
              <EcommerceProductViewGridItemSkeleton />
            ) : (
              <EcommerceProductViewListItemSkeleton />
            )}
          </Box>
        ))}
      </Box>
    );
  }

  if (!filteredProducts.length) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ minHeight: '500px', minWidth: '800px', md: { minWidth: '1200px' }, lg: { minWidth: '1600px' }, }}>
        <EmptyContent 
          title={t('no_products_found')} 
          sx={{ py: 10 }}
        />
      </Stack>
    );
  }

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={viewMode === 'grid' 
          ? { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)' }
          : '1fr'
        }
      >
        {filteredProducts.map((product) => (
          <Box key={product.id}>
            {viewMode === 'grid' ? (
              <EcommerceProductViewGridItem product={product} />
            ) : (
              <EcommerceProductViewListItem product={product} />
            )}
          </Box>
        ))}
      </Box>

      {meta && meta.total > (viewMode === 'list' ? 12 : 20) && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          <Pagination
            count={Math.ceil(meta.total / (viewMode === 'list' ? 12 : 20))}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPagination-ul': {
                justifyContent: 'center',
              },
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
            {t('showing')} {(page - 1) * (viewMode === 'list' ? 12 : 20) + 1}-
            {Math.min(page * (viewMode === 'list' ? 12 : 20), meta.total)} {t('of')} {meta.total} {t('items')}
          </Typography>
        </Stack>
      )}
    </>
  );
}

// Add this helper function to find a category by ID
const findCategoryById = (categories: Category[], id: number): Category | null => {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.children) {
      const found = findCategoryById(category.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

