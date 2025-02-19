// @mui
import {
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  StackProps,
} from "@mui/material";
import { useTranslate } from "src/locales";
// ----------------------------------------------------------------------

interface Props extends StackProps {
  options: string[];
  filterGender: string;
  onChangeGender: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EcommerceFilterGender({
  options,
  filterGender,
  onChangeGender,
  ...other
}: Props) {
  const { t } = useTranslate('product');
  return (
    <Stack {...other}>
      <RadioGroup value={filterGender} onChange={onChangeGender}>
        {options.map((gender) => (
          <FormControlLabel
            key={gender}
            value={gender}
            control={<Radio />}
            label={t(`gender.${gender}`)}
          />
        ))}
      </RadioGroup>
    </Stack>
  );
}
