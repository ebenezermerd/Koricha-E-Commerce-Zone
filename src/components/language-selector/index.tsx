import { LanguageValue, useTranslate } from 'src/locales';
import { MenuItem, Select } from '@mui/material';
export function LanguageSelector() {
  const { currentLang, onChangeLang } = useTranslate();
  
  return (
    <Select
      value={currentLang.value}
      onChange={(e) => onChangeLang(e.target.value as LanguageValue)}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="or">Oromiffa</MenuItem>
      <MenuItem value="am">Amharic</MenuItem>
    </Select>
  );
} 