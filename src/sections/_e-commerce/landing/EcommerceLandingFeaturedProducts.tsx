// @mui
import { Box, Typography, Container, Unstable_Grid2 as Grid, Skeleton } from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
//
import { EcommerceProductItemHot, EcommerceProductItemCountDown } from '../product/item';

// ----------------------------------------------------------------------

export default function EcommerceLandingFeaturedProducts() {
  const { products, productsLoading } = useGetProducts();

  // Filter products for countdown section (products with active sales)
  const countdownProducts = products
    ?.filter((product) => 
      product.priceSale > 0 && 
      product.saleLabel.enabled && 
      product.inStock > 0
    )
    .slice(0, 2);

  // Filter products for hot deals section
  const hotProducts = products
    ?.filter((product) => 
      product.rating >= 4 || 
      product.totalSold > 1 || 
      product.inStock > 0
    )
    .slice(0, 4);

  if (productsLoading) {
    return (
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Skeleton variant="rectangular" height={600} />
      </Container>
    );
  }

  // if (!products?.length || !countdownProducts?.length || !hotProducts?.length) {
  //   return null;
  // }

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Featured Products
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} lg={8}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            {countdownProducts.map((product, index) => (
              <EcommerceProductItemCountDown
                key={product.id}
                product={product}
                color={index === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </Box>
        </Grid>

        <Grid xs={12} lg={4}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
          >
            {hotProducts.map((product) => (
              <EcommerceProductItemHot 
                key={product.id} 
                product={product} 
                hotProduct 
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
