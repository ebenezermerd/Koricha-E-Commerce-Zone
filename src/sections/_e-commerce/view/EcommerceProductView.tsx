import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import LoadingScreen from 'src/components/loading-screen';
import { EmptyContent } from 'src/components/empty-content';
import ReviewEcommerce from '../../review/e-commerce';
import { EcommerceHeader } from '../layout';
import {
  EcommerceProductDetailsInfo,
  EcommerceProductDetailsCarousel,
  EcommerceProductDetailsDescription,
} from '../product/details';
// hooks
import { useGetProduct } from 'src/services/useProducts';

export default function EcommerceProductView() {
  const { id } = useParams();

  const { product, productLoading, productError } = useGetProduct(id || '');

  if (productLoading) {
    return <LoadingScreen />;
  }

  if (productError || !product) {
    return (
      <EmptyContent
        filled
        title="Product Not Found"
        description="Sorry, we couldn't find the product you're looking for"
        sx={{ py: 10 }}
      />
    );
  }

  return (
    <>
      <EcommerceHeader />

      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/e-commerce/products' },
            { name: product.name },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel images={[product.coverImg, ...product.images]} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              id={product.id}
              name={product.name}
              price={product.price}
              rating={product.totalRatings}
              review={product.totalReviews}
              priceSale={product.priceSale}
              sizes={product.sizes}
              colors={product.colors}
              available={product.available}
              inventoryType={product.inventoryType}
              vendor={product.vendor || {
                id: '',
                name: '',
                phone: '',
                email: ''
              }}
              caption={product.caption}
              coverImg={product.coverImg}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }} sx={{ mx: 5 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={product.description}
              specifications={[
                { label: 'Category', value: product.category },
                { label: 'SKU', value: product.sku },
                { label: 'Brand', value: product.brand?.name || 'N/A' },
                { label: 'Vendor', value: product.vendor?.name || 'N/A' },
                { label: 'Stock', value: `${product.available} items` },
              ]}
            />
          </Grid>

          {/* <Grid xs={12} md={6} lg={5}>
            <ReviewEcommerce
              productId={product.id}
              ratingsNumber={product.totalRatings}
              reviewsNumber={product.totalReviews}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}