// @mui
import { Stack, StackProps } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import { useTranslate } from 'src/locales';


// ----------------------------------------------------------------------

interface Props extends StackProps {
  options: string[];
  filterCategories: string;
  onChangeCategories: (name: string) => void;
}

export default function EcommerceFilterCategory({
  options,
  filterCategories,
  onChangeCategories,
  ...other
}: Props) {
  const { t } = useTranslate('product');

  return (
    <Stack spacing={1} alignItems="flex-start" {...other}>
      {options.map((option) => (
        <Stack
          key={option}
          direction="row"
          alignItems="center"
          onClick={() => onChangeCategories(filterCategories === option ? '' : option)}
          sx={{
            typography: 'body2',
            cursor: 'pointer',
            ...(filterCategories === option && {
              fontWeight: 'fontWeightBold',
            }),
          }}
        >
          <Iconify icon="carbon:chevron-right" width={12} sx={{ mr: 1 }} />
          {t(`categories.${option.toLowerCase().replace(/\s+/g, '_')}`)}
        </Stack>
      ))}
    </Stack>
  );
}
