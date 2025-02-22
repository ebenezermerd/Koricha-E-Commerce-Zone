// @mui
import { Box, Stack, Pagination } from '@mui/material';
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


// ----------------------------------------------------------------------

type Props = {
  products: IProductItemProps[];
  viewMode: string;
  loading?: boolean;
  filters: IProductFiltersProps;
};

const filterProducts = (products: IProductItemProps[], filters: IProductFiltersProps) => {
  return products.filter(product => {
    // Category filter
    if (filters.filterCategories && product.category !== filters.filterCategories) {
      return false;
    }

    // Color filter
    if (filters.filterColor.length && !filters.filterColor.some(color => 
      product.colors.includes(color)
    )) {
      return false;
    }

    // Brand filter - safely handle null/undefined brand
    if (filters.filterBrand.length) {
      const productBrandName = product.brand?.name || '';
      if (!filters.filterBrand.includes(productBrandName)) {
        return false;
      }
    }

    // Price filter
    if (filters.filterPrice.start > 0 || filters.filterPrice.end > 0) {
      const price = product.priceSale || product.price;
      if (price < filters.filterPrice.start || price > filters.filterPrice.end) {
        return false;
      }
    }

    // Gender filter - check if any selected gender matches product's genders
    if (filters.filterGender && !product.gender.includes(filters.filterGender)) {
      return false;
    }

    // Stock filter - check inventory status
    if (filters.filterStock) {
      const inventoryStatus = product.inventoryType;
      if (inventoryStatus === 'out_of_stock' || inventoryStatus === 'discontinued') {
        return false;
      }
    }

    // Rating filter
    if (filters.filterRating && product.rating < Number(filters.filterRating)) {
      return false;
    }

    // Tag filter - check if product has any of the selected tags
    if (filters.filterTag.length && !filters.filterTag.some(tag => 
      product.tags.includes(tag)
    )) {
      return false;
    }

    return true;
  });
};

export default function EcommerceProductList({ loading, viewMode, products, filters }: Props) {
  const { t } = useTranslate('product');
  const filteredProducts = filterProducts(products, filters);

  if (!loading && filteredProducts.length === 0) {
    const categoryName = filters.filterCategories 
      ? t(`categories.${filters.filterCategories.toLowerCase().replace(/\s+/g, '_')}`)
      : null;

    return (
      <Box sx={{ py: 5 }}>
        <EmptyContent
          title={categoryName ? t('empty.category', { category: categoryName }) : t('empty.products')}
          description={categoryName ? t('empty.category_description') : t('empty.products_description')}
          imgUrl="/assets/icons/empty/ic_product.svg"
          sx={{ py: 10 }}
        />
      </Box>
    );
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
        >
          {(loading ? [...Array(16)] : filteredProducts).map((product, index) =>
            product ? (
              <EcommerceProductViewGridItem key={product.id} product={product} />
            ) : (
              <EcommerceProductViewGridItemSkeleton key={index} />
            )
          )}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading ? [...Array(16)] : filteredProducts).map((product, index) =>
            product ? (
              <EcommerceProductViewListItem key={product.id} product={product} />
            ) : (
              <EcommerceProductViewListItemSkeleton key={index} />
            )
          )}
        </Stack>
      )}

      <Pagination
        count={Math.ceil(filteredProducts.length / 16)}
        color="primary"
        size="large"
        sx={{
          mt: 10,
          mb: 5,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
