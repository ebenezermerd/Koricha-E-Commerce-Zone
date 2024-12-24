import { styled } from '@mui/material/styles';
import { Stack, FormGroup, StackProps } from '@mui/material';

const ColorButton = styled('button')<{ color?: string; selected?: boolean }>(({ theme, color, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 12px',
  margin: '4px 0',
  border: selected ? `2px solid ${color}` : 'none', // Updated this line
  borderRadius: '20px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s',
  width: '100%',
  '&:hover': {
    backgroundColor: `${color}11`,
  },
  ...(selected && {
    backgroundColor: `${color}22`,
    boxShadow: `0 0 8px ${color}`,
  }),
}));

const ColorDot = styled('div')(({ theme, color }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: color,
  border: `1px solid ${theme.palette.divider}`,
  marginRight: theme.spacing(1)
}));

interface ColorOption {
  name: string;
  code: string;
}

interface Props extends StackProps {
  options: ColorOption[];
  filterColor: string[];
  onChangeColor: (name: string) => void;
}

export default function EcommerceFilterColor({ options, filterColor, onChangeColor, ...other }: Props) {
  return (
    <Stack {...other}>
      <FormGroup>
        {options.map((color) => (
          <ColorButton
            key={color.name}
            color={color.code}
            selected={filterColor.includes(color.name)}
            onClick={() => onChangeColor(color.name)}
          >
            <ColorDot color={color.code} />
            {color.name}
          </ColorButton>
        ))}
      </FormGroup>
    </Stack>
  );
}
