import type { SxProps } from '@mui/material/styles';
import type { Country } from 'react-phone-number-input';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from '../iconify';
import { countries } from 'src/assets/data/countries';
import { getCountry } from './utils';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps;
  countryCode: Country;
  searchCountry: string;
  onClickCountry: (country: Country) => void;
  onSearchCountry: (inputValue: string) => void;
};

export function CountryListPopover({
  sx,
  countryCode,
  searchCountry,
  onClickCountry,
  onSearchCountry,
}: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const selectedCountry = getCountry(countryCode);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mr: 'var(--popover-button-mr)',
          height: 'var(--popover-button-height)',
          width: 'var(--popover-button-width)',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 9,
          ...sx,
        }}
      >
        <Box
          component="span"
          sx={{
            width: 28,
            height: 20,
            display: 'inline-block',
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: '4px',
            position: 'relative',
            '& img': {
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
          onClick={handleOpenPopover}
        >
          <img
            alt={selectedCountry?.label}
            src={`https://flagcdn.com/${selectedCountry?.code.toLowerCase()}.svg`}
          />
        </Box>

        <Typography
          variant="subtitle2"
          sx={{
            pl: 0.5,
            pr: 0.5,
            cursor: 'pointer',
            color: 'text.secondary',
          }}
          onClick={handleOpenPopover}
        >
          +{selectedCountry?.phone}
        </Typography>
      </Stack>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              p: 2,
            },
          },
        }}
      >
        <TextField
          fullWidth
          value={searchCountry}
          onChange={(event) => onSearchCountry(event.target.value)}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            maxHeight: 60 * 6,
            overflow: 'auto',
          }}
        >
          {countries
            .filter((country) => country.label.toLowerCase().includes(searchCountry.toLowerCase()))
            .map((country) => (
              <Stack
                key={country.code}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'background.neutral',
                  },
                  ...(country.code === countryCode && {
                    bgcolor: 'background.neutral',
                  }),
                }}
                onClick={() => {
                  onClickCountry(country.code as Country);
                  handleClosePopover();
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 28,
                    height: 20,
                    display: 'inline-block',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    '& img': {
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  }}
                >
                  <img
                    alt={country.label}
                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                  />
                </Box>

                <Typography variant="subtitle2">{country.label}</Typography>

                <Typography variant="caption" sx={{ color: 'text.secondary', ml: 'auto' }}>
                  +{country.phone}
                </Typography>
              </Stack>
            ))}
        </Box>
      </Popover>
    </>
  );
} 