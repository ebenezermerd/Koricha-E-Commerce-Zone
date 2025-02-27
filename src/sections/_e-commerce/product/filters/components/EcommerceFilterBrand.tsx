// @mui
import { Checkbox, Stack, FormControlLabel, StackProps } from '@mui/material';
import { useTranslate } from 'src/locales';
import LoadingScreen from 'src/components/loading-screen';
// ----------------------------------------------------------------------

interface Props extends StackProps {
  options: Array<{ id: string; name: string }>;
  filterBrand: Array<{ id: string; name: string }>;
  onChangeBrand: (brand: { id: string; name: string }) => void;
  loading: boolean;
}

export default function EcommerceFilterBrand({
  options,
  filterBrand,
  onChangeBrand,
  loading,
  ...other
}: Props) {
  const { t } = useTranslate('product');

  return (
    <Stack {...other} sx={{ pl: 3 }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        options.map((brand) => (
          <FormControlLabel
            key={brand.id}
            control={
              <Checkbox
                size="small"
                value={brand.id}
                checked={filterBrand.some(b => b.id === brand.id)}
                onChange={() => onChangeBrand(brand)}
              />
            }
            label={t(`brands.${brand.name.toLowerCase().replace(/\s+/g, '_')}`)}
          />
        )))}
    </Stack>
  );
}
