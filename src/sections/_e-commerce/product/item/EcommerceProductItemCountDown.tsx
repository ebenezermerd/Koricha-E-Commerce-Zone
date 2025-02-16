import { add } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Theme, alpha, useTheme } from '@mui/material/styles';
import { Typography, Stack, SxProps, Link } from '@mui/material';
// utils
import { filterStyles } from 'src/utils/cssStyles';
import { fCurrency } from 'src/utils/formatNumber';
// routes
import { paths } from 'src/routes/paths';
// types
import { IProductItemProps } from 'src/types/product';
// theme
import { ColorSchema } from 'src/theme/palette';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
//
import { ProductCountdownBlock } from '../../components';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItemProps;
  color?: ColorSchema;
  sx?: SxProps<Theme>;
};

export default function EcommerceProductItemCountDown({ product, color = 'primary', sx }: Props) {
  const theme = useTheme();

  // Calculate expiry date based on sale status
  const getExpiryDate = () => {
    if (product.saleLabel.enabled) {
      // If sale is active, set countdown for 24 hours from now
      return add(new Date(), { days: 1 });
    }
    // Default fallback
    return add(new Date(), { hours: 8 });
  };

  return (
    <Link 
      component={RouterLink} 
      to={paths.eCommerce.product.replace(':id', product.id)} 
      color="inherit" 
      underline="none"
    >
      <Stack
        spacing={3}
        sx={{
          p: 3,
          borderRadius: 2,
          color: `${color}.darker`,
          bgcolor: `${color}.lighter`,
          cursor: 'pointer',
          transition: theme.transitions.create(['background-color', 'color'], {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            color: `${color}.lighter`,
            bgcolor: `${color}.main`,
            '& .countdown-text': {
              color: `${color}.lighter`,
            },
          },
          ...sx,
        }}
      >
        <Image
          src={product.coverImg}
          sx={{
            height: 350,
            ...filterStyles(
              `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
            ),
          }}
        />

        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <TextMaxLine 
            variant="subtitle2" 
            sx={{ 
              opacity: 0.72,
              transition: theme.transitions.create('color'),
            }}
            className="countdown-text"
          >
            {product.name}
          </TextMaxLine>

          <Stack direction="row" justifyContent="center" spacing={0.5}>
            {product.priceSale > 0 && (
              <Typography
                component="span"
                variant="h5"
                sx={{ 
                  color: 'text.disabled', 
                  textDecoration: 'line-through',
                  transition: theme.transitions.create('color'),
                }}
                className="countdown-text"
              >
                {fCurrency(product.price)}
              </Typography>
            )}
            <Typography 
              variant="h5"
              className="countdown-text"
              sx={{ transition: theme.transitions.create('color') }}
            >
              {product.priceSale > 0 ? fCurrency(product.priceSale) : fCurrency(product.price)}
            </Typography>
          </Stack>
        </Stack>

        <ProductCountdownBlock 
          expired={getExpiryDate()} 
          sx={{
            '& .countdown-number': {
              transition: theme.transitions.create('color'),
            },
            '& .countdown-text': {
              transition: theme.transitions.create('color'),
            }
          }}
        />
      </Stack>
    </Link>
  );
}
