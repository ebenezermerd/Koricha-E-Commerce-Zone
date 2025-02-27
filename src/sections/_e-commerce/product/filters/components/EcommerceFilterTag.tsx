// @mui
import { Stack, StackProps, Chip } from '@mui/material';
import { useTranslate } from 'src/locales';
import { useTags } from 'src/hooks/useProductFilter';
import LoadingScreen from 'src/components/loading-screen';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  filterTag: string[];
  onChangeTag: (name: string) => void;
}

export default function EcommerceFilterTag({
  filterTag,
  onChangeTag,
  ...other
}: Props) {
  const { t } = useTranslate('product');
  const { tags, isLoading } = useTags();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack direction="row" flexWrap="wrap"  alignItems="center" {...other}>
      {tags.map((option: any) => {
        const selected = filterTag.includes(option.value);

        return (
          <Chip
            key={option.value}
            label={t(`tags.${option.value.toLowerCase().replace(/\s+/g, '_')}`)}
            onClick={() => onChangeTag(option.value)}
            variant={selected ? "filled" : "outlined"}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
              ...(selected && {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightBold',
              }),
            }}
          />
        );
      })}
    </Stack>
  );
}
