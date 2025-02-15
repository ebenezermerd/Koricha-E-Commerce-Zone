import { useTranslate } from 'src/locales';
import { MenuItem, Select } from '@mui/material';

export function LanguageSelector() {
  const { currentLang, onChangeLang } = useTranslate();
  
  return (
    <Select
      value={currentLang.value}
      onChange={(e) => onChangeLang(e.target.value as 'en' | 'ar' | 'am')}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">Arabic</MenuItem>
      <MenuItem value="am">Amharic</MenuItem>
    </Select>
  );
} 