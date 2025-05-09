import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Box, StackProps, Fab, Link } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// types
import { IProductItemProps } from 'src/types/product';
// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
//
import { ProductRating, ProductPrice } from '../../components';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  product: IProductItemProps;
}

export default function EcommerceProductViewGridItem({ product, sx, ...other }: Props) {
  const productPath = paths.eCommerce.product.replace(':id', product.id);
  return (
    <Stack
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {product.newLabel.enabled && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          {product.newLabel.content}
        </Label>
      )}

      {product.saleLabel.enabled && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          {product.saleLabel.content}
        </Label>
      )}

      <Box sx={{ position: 'relative', mb: 2 }}>
        <Fab
          component={RouterLink}
          to={productPath}
          className="add-to-cart"
          color="primary"
          size="medium"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" />
        </Fab>

        <Image
          src={product.coverUrl}
          sx={{
            flexShrink: 0,
            width: 180,
            height: 200,
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}  
        />
      </Box>
      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.category}
        </TextMaxLine>

        <Link component={RouterLink} to={productPath} color="inherit">
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} priceSale={product.priceSale} />

        <ProductRating rating={product.rating} label={`${product.totalSold} sold`} />
      </Stack>
    </Stack>
  );
}
