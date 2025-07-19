import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha, Theme } from '@mui/material/styles';
import {
  Input,
  Slide,
  Button,
  SxProps,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  Box,
  Stack,
  Typography,
  Link,
  CircularProgress,
} from '@mui/material';
// config
import { HEADER } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import { useProductSearch } from 'src/hooks/useProductSearch';
import { IProductItemProps } from 'src/types/product';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const StyledSearchbar = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER.H_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: HEADER.H_MAIN_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const SearchResultsDropdown = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 99,
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.z24,
  maxHeight: '400px',
  overflowY: 'auto',
}));

const SearchResultItem = styled(Link)<{ component?: React.ElementType; to: string }>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  textDecoration: 'none',
  color: theme.palette.text.primary,
  transition: theme.transitions.create('background-color'),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

// ----------------------------------------------------------------------

type SearchbarProps = {
  sx?: SxProps<Theme>;
};

export default function Searchbar({ sx }: SearchbarProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading, error } = useProductSearch(searchQuery);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 100);
  };


  const handleClose = () => {
    setOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      const product = results[selectedIndex];
      if (product) {
        window.location.href = paths.eCommerce.product.replace(':id', product.id);
        handleClose();
      }
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton color="inherit" aria-label="search" onClick={handleOpen} sx={sx}>
          <Iconify icon="carbon:search" />
        </IconButton>

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              inputRef={inputRef}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="carbon:search" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
              endAdornment={loading && <CircularProgress size={20} />}
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            
            {searchQuery && (
              <SearchResultsDropdown>
                {error ? (
                  <Box p={2}>
                    <Typography variant="body2" color="error">
                      Error loading results
                    </Typography>
                  </Box>
                ) : results.length > 0 ? (
                  results.map((product, index) => (
                    <SearchResultItem
                      key={product.id}
                      component={RouterLink}
                      to={paths.eCommerce.product.replace(':id', product.id)}
                      onClick={handleClose}
                      sx={{
                        bgcolor: index === selectedIndex ? 'action.selected' : 'transparent'
                      }}
                    >
                      <Box
                        component="img"
                        src={product.coverUrl}
                        alt={product.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          objectFit: 'cover',
                          mr: 2,
                        }}
                      />
                      <Stack>
                        <Typography variant="subtitle2" noWrap>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {product.subDescription}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" color="primary">
                            {product.price} ETB
                          </Typography>
                          {product.priceSale && (
                            <Typography variant="caption" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                              {product.priceSale} ETB
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </SearchResultItem>
                  ))
                ) : !loading && (
                  <Box p={2}>
                    <Typography variant="body2" color="text.secondary">
                      No products found
                    </Typography>
                  </Box>
                )}
              </SearchResultsDropdown>
            )}
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
