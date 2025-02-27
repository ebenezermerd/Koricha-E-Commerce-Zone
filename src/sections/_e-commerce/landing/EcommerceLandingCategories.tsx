import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Typography, Container, Stack, Link } from '@mui/material';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import LoadingScreen from 'src/components/loading-screen';
// hooks
import { ICategoryItem, useLandingCategories } from 'src/hooks/useProductFilter';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

interface Category extends ICategoryItem {
  productsCount?: number;
}

export default function EcommerceLandingCategories() {
  const { t } = useTranslate('landing');
  const { categories, isLoading } = useLandingCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    // Use category.id for parent categories, or find parent if it's a subcategory
    const queryParams = new URLSearchParams();
    queryParams.set('category', category.id.toString());
    navigate(`${paths.eCommerce.products}?${queryParams.toString()}`);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Filter categories to only show ones with products
  const featuredCategories = categories.filter((cat: any) => cat.productsCount && cat.productsCount > 0);

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack spacing={1} sx={{ mb: 4 }} alignItems={{ xs: 'center', md: 'unset' }}>
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
          {t('categories.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('categories.subtitle')}
        </Typography>
      </Stack>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(6, 1fr)',
        }}
      >
        {featuredCategories.map((category: any) => (
          <Stack
            key={category.id}
            alignItems="center"
            justifyContent="center"
            onClick={() => handleCategoryClick(category)}
            sx={{
              px: 1,
              py: 3,
              borderRadius: 2,
              cursor: 'pointer',
              border: theme => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
              '&:hover': {
                boxShadow: theme => `0 0 0 2px ${theme.palette.text.primary}`,
              },
            }}
          >
            <Box sx={{ mb: 2, p: 1.5, bgcolor: 'background.neutral', borderRadius: '50%' }}>
              <Image 
                src={category.icon || ''} 
                sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} 
              />
            </Box>

            <TextMaxLine variant="subtitle2" line={1}>
              {category.name}
            </TextMaxLine>
            
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {category.productsCount} {t('categories.products')}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
