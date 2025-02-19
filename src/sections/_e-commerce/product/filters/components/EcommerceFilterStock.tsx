// @mui
import { Switch, FormControlLabel, StackProps } from '@mui/material';
import { useTranslate } from 'src/locales';
// ----------------------------------------------------------------------

interface Props extends StackProps {
  filterStock: boolean;
  onChangeStock: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EcommerceFilterStock({ filterStock, onChangeStock }: Props) {
  const { t } = useTranslate('product');
  return (
    <FormControlLabel
      control={<Switch color="success" checked={filterStock} onChange={onChangeStock} />}
      labelPlacement="start"
      label={t('stock.inStock')}
      sx={{
        m: 0,
        '& .MuiFormControlLabel-label': { typography: 'h6' },
      }}
    />
  );
}
