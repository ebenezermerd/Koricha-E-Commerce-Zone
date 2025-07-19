import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Unstable_Grid2 as Grid, Box, Divider } from '@mui/material';
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

      <Container maxWidth="lg" sx={{ pt: 3, pb: 10 }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/e-commerce/products' },
            { name: product.name },
          ]}
          sx={{ mb: 5 }}
        />

        <Box sx={{  borderRadius: 2, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            {/* Product Images */}
            <Grid xs={12} md={6} lg={7} sx={{border: '1px solid #e0e0e0', borderRadius: 1}}>
              <EcommerceProductDetailsCarousel images={[product.coverImg, ...product.images]} />
            </Grid>

            {/* Product Info */}
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
        </Box>

        <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Product Description */}
          <Grid xs={12} md={7}>
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

          {/* Product Reviews */}
          <Grid xs={12} md={5}>
            <ReviewEcommerce
              productId={product.id}
              ratingsNumber={product.totalRatings}
              reviewsNumber={product.totalReviews}
              reviews={product.reviews}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}