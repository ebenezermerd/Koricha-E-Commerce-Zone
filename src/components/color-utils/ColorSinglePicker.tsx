import { forwardRef } from 'react';
// @mui
import { Radio, RadioProps } from '@mui/material';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

interface Props extends RadioProps {
  value: string;
  selected?: boolean;
  onSelectColor?: (color: string) => void;
}

// Add a color mapping helper
const getColorValue = (color: string) => {
  // If it's already a valid color format, return it
  if (color.startsWith('#') || color.startsWith('rgb')) {
    return color;
  }

  // Color name to hex mapping
  const colorMap: { [key: string]: string } = {
    red: '#FF4842',
    blue: '#1890FF',
    green: '#00AB55',
    violet: '#7F00FF',
    cyan: '#00B8D9',
    // Add other colors as needed
  };

  return colorMap[color.toLowerCase()] || color;
};

const ColorSinglePicker = forwardRef<HTMLInputElement, Props>(
  ({ value, selected, onSelectColor, sx, ...other }, ref) => {
    const color = value;

    const renderContent = (
      <Radio
        ref={ref as React.Ref<HTMLButtonElement>}
        color="default"
        value={value}
        onClick={() => onSelectColor?.(value)}
        sx={{
          color,
          '&:hover': {
            bgcolor: alpha(getColorValue(color), 0.08),
          },
          '&.Mui-checked': {
            color,
            '&:hover': {
              bgcolor: alpha(getColorValue(color), 0.08),
            },
          },
          ...sx,
        }}
        {...other}
      />
    );

    return renderContent;
  }
);

export default ColorSinglePicker; 