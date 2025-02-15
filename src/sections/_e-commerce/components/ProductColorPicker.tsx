// @mui
import { Stack, Radio, StackProps, RadioGroup, FormControlLabel, Box } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import { useTheme } from '@mui/material/styles';
import { ColorSinglePicker } from 'src/components/color-utils';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  selected: string;
  onSelectColor: (color: string) => void;
  sx?: object;
};

// Update color handling
const varAlpha = (color: string, opacity = 1) => {
  // Handle RGB channel format
  if (color.match(/^\d+ \d+ \d+$/)) {
    return `rgba(${color} / ${opacity})`;
  }

  // Handle hex and other formats
  return alpha(color, opacity);
};

export default function ProductColorPicker({ options, selected, onSelectColor, sx, ...other }: Props) {
  const theme = useTheme();

  return (
    <RadioGroup row {...other}>
      {options.map((option) => {
        const whiteColor = option.value === '#FFFFFF' || option.value === 'white';

        return (
          <Box
            key={option.value}
            sx={{
              ...sx,
              ...(selected === option.value && {
                border: (theme) => `solid 2px ${theme.palette.text.primary}`,
                boxShadow: (theme) => `inset 0 0 0 2px ${varAlpha(option.value, 0.24)}`,
              }),
              ...(whiteColor && {
                border: `solid 1px ${theme.palette.divider}`,
              }),
            }}
          >
            <ColorSinglePicker
              value={option.value}
              selected={selected === option.value}
              onSelectColor={() => onSelectColor(option.value)}
            />
          </Box>
        );
      })}
    </RadioGroup>
  );
}
