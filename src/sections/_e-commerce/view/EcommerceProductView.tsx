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
  const { id = '' } = useParams();
  const { product, productLoading, productError } = useGetProduct(id);

  if (productLoading) {
    return <LoadingScreen />;
  }

  if (productError) {
    return (
      <EmptyContent
        filled
        title="Product Not Found"
        sx={{
          py: 10,
        }}
      />
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <EcommerceHeader />

      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home' },
            { name: product.category },
            { name: product.name },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel images={product.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              name={product.name}
              price={product.price}
              rating={product.rating}
              review={product.review}
              priceSale={product.priceSale}
              caption={product.caption}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={product.description}
              specifications={[
                { label: 'Category', value: product.category },
                { label: 'Manufacturer', value: product.description },
                { label: 'Warranty', value: product.subDescription },
                { label: 'Serial number', value: product.sku },
                { label: 'Ships From', value: product.vendor?.name || '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>

      <ReviewEcommerce />
    </>
  );
}