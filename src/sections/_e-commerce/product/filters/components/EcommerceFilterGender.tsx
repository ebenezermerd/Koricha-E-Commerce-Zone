// @mui
import {
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  StackProps,
} from "@mui/material";
import { useTranslate } from "src/locales";
import { useGenders } from "src/hooks/useProductFilter";
import LoadingScreen from "src/components/loading-screen";
// ----------------------------------------------------------------------

interface Props extends StackProps {
  filterGender: string;
  onChangeGender: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EcommerceFilterGender({
  filterGender,
  onChangeGender,
  ...other
}: Props) {
  const { t } = useTranslate('product');
  const { genders, isLoading } = useGenders();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack {...other}>
      <RadioGroup value={filterGender} onChange={onChangeGender}>
        {genders.map((gender: any) => (
          <FormControlLabel
            key={gender.value}
            value={gender.value}
            control={<Radio />}
            label={t(`gender.${gender.value}`)}
          />
        ))}
      </RadioGroup>
    </Stack>
  );
}
