// @mui
import {
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  StackProps,
} from "@mui/material";

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
  return (
    <Stack {...other}>
      <RadioGroup value={filterGender} onChange={onChangeGender}>
        {options.map((gender) => (
          <FormControlLabel
            key={gender}
            value={gender}
            control={<Radio />}
            label={gender}
          />
        ))}
      </RadioGroup>
    </Stack>
  );
}
