import { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  Paper, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  CircularProgress,
  Stack,
  SelectChangeEvent,
  Collapse,
  FormControlLabel,
  Switch,
  Autocomplete
} from '@mui/material';
import { useVariantSearch } from 'src/hooks/useAdvancedProductSearch';
import { useCategories } from 'src/hooks/useProductFilter';
import Iconify from 'src/components/iconify';
import { useTranslate } from 'src/locales';
import { useNavigate } from 'react-router-dom';
import { PATH_ECOMMERCE } from 'src/routes/paths';

interface CategorySearchBoxProps {
  placeholder?: string;
  minWidth?: number | string;
  maxWidth?: number | string;
  sx?: object;
  onResultClick?: (productId: string) => void;
}

export default function CategorySearchBox({
  placeholder = 'Search products...',
  minWidth = 280,
  maxWidth = 600,
  sx = {},
  onResultClick
}: CategorySearchBoxProps) {
  const { t } = useTranslate('common');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  
  // Category related state
  const { categories, loading: categoriesLoading } = useCategories();
  const [variant, setVariant] = useState<string>('');
  const [includeSubcategories, setIncludeSubcategories] = useState(true);
  
  // Get all variant options (categories, subcategories, and groups)
  const variantOptions = useMemo(() => {
    if (!categories) return [];
    
    const options: {label: string; group: string; type: string}[] = [];
    const groups = new Set<string>();
    
    // Add main categories
    categories.forEach(category => {
      // Add the main category
      options.push({
        label: category.name,
        group: 'Categories',
        type: 'category'
      });
      
      // Track groups
      if (category.group) {
        groups.add(category.group);
      }
      
      // Add subcategories
      if (category.children && category.children.length > 0) {
        category.children.forEach(subcategory => {
          options.push({
            label: subcategory.name,
            group: `${category.name} Subcategories`,
            type: 'subcategory'
          });
        });
      }
    });
    
    // Add groups
    Array.from(groups).forEach(group => {
      options.push({
        label: group,
        group: 'Groups',
        type: 'group'
      });
    });
    
    return options;
  }, [categories]);

  // Fetch search results using the updated hook
  const { results, loading, error } = useVariantSearch(
    query,
    advanced && variant ? variant : '',
    includeSubcategories
  );

  // Hide results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  // Handle clicking on search box to prevent hiding results
  const handleSearchBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowResults(true);
  };

  // Handle result click
  const handleResultClick = (productId: string) => {
    if (onResultClick) {
      onResultClick(productId);
    } else {
      navigate(`${PATH_ECOMMERCE.products}/${productId}`);
    }
    setShowResults(false);
  };

  return (
    <Box sx={{ position: 'relative', ...sx }} onClick={handleSearchBoxClick}>
      <FormControl fullWidth>
        <TextField
          fullWidth
          value={query}
          onChange={handleSearchChange}
          placeholder={placeholder}
          sx={{ minWidth, maxWidth }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={() => setAdvanced(!advanced)}
                  color={advanced ? 'primary' : 'default'}
                >
                  <Iconify icon="mdi:tune" />
                </IconButton>
                {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
              </InputAdornment>
            )
          }}
        />
      </FormControl>

      {/* Advanced search options */}
      <Collapse in={advanced}>
        <Paper sx={{ p: 2, mt: 1, mb: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">{t('advanced_search_options')}</Typography>
            
            <Autocomplete
              options={variantOptions}
              groupBy={(option) => option.group}
              getOptionLabel={(option) => option.label}
              loading={categoriesLoading}
              value={variantOptions.find(option => option.label === variant) || null}
              onChange={(_, newValue) => setVariant(newValue ? newValue.label : '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('search_in_variant')}
                  placeholder={t('select_category_subcategory_or_group')}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {categoriesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  {option.label}
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    ({option.type})
                  </Typography>
                </li>
              )}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={includeSubcategories}
                  onChange={(e) => setIncludeSubcategories(e.target.checked)}
                  disabled={!variant}
                />
              }
              label={t('include_subcategories')}
            />
          </Stack>
        </Paper>
      </Collapse>

      {/* Search results */}
      {showResults && query && (
        <Paper
          sx={{
            position: 'absolute',
            width: '100%',
            mt: 1,
            zIndex: 1000,
            maxHeight: 400,
            overflow: 'auto',
          }}
        >
          {error && (
            <Box p={2}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}

          {!loading && results.length === 0 && !error && (
            <Box p={2}>
              <Typography>{t('no_results_found')}</Typography>
            </Box>
          )}

          {results.length > 0 && (
            <List disablePadding>
              {results.map((product) => (
                <ListItem key={product.id} disablePadding divider>
                  <ListItemButton onClick={() => handleResultClick(product.id)}>
                    <Box
                      component="img"
                      src={product.coverImg}
                      alt={product.name}
                      sx={{ width: 40, height: 40, mr: 2, borderRadius: 1 }}
                    />
                    <ListItemText
                      primary={product.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            ${product.price}
                          </Typography>
                          {product.category && (
                            <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                              in {product.category.name}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}
    </Box>
  );
} 