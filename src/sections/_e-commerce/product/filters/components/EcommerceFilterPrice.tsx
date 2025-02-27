// @mui
import { TextField, StackProps, Stack } from '@mui/material';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  filterPrice: {
    start: number;
    end: number;
  };
  onChangeStartPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// ----------------------------------------------------------------------

export default function EcommerceFilterPrice({
  filterPrice,
  onChangeStartPrice,
  onChangeEndPrice,
  ...other
}: Props) {
  const { t } = useTranslate('product');
  return (
    <Stack spacing={2} direction="row" alignItems="center" divider={<div> - </div>} {...other}>
      <TextField
        size="small"
        label={t('filters.price.min')}
        type="number"
        value={filterPrice.start === 0 ? '' : filterPrice.start}
        onChange={onChangeStartPrice}
        inputProps={{ 
          min: 0,
          step: "0.01"
        }}
      />
      <TextField
        size="small"
        label={t('filters.price.max')}
        type="number"
        value={filterPrice.end === 0 ? '' : filterPrice.end}
        onChange={onChangeEndPrice}
        inputProps={{ 
          min: 0,
          step: "0.01"
        }}
        error={filterPrice.end > 0 && filterPrice.start > filterPrice.end}
        helperText={filterPrice.end > 0 && filterPrice.start > filterPrice.end ? t('filters.price.error') : ''}
      />
    </Stack>
  );
}
