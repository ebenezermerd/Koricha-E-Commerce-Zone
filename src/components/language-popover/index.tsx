import { m } from 'framer-motion';
import { useCallback } from 'react';
import type { IconButtonProps } from '@mui/material/IconButton';
import { MenuList, MenuItem, IconButton } from '@mui/material';

import { useTranslate } from 'src/locales';
import { varHover } from 'src/components/animate';
import { FlagIcon } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import CustomPopover from 'src/components/custom-popover/CustomPopover';
import { allLangs } from 'src/locales/all-langs';
import type { LanguageValue } from 'src/locales/config-locales';

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps & {
  data?: typeof allLangs;
};

export function LanguagePopover({ sx, ...other }: LanguagePopoverProps) {
  const popover = usePopover();
  const { onChangeLang, currentLang } = useTranslate();

  const handleChangeLang = useCallback(
    (newLang: LanguageValue) => {
      onChangeLang(newLang);
      popover.onClose();
    },
    [onChangeLang, popover]
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          p: 0,
          width: 40,
          height: 40,
          ...(popover.open && { bgcolor: 'action.selected' }),
          ...sx,
        }}
        {...other}
      >
        <FlagIcon code={currentLang.countryCode} />
      </IconButton>

      <CustomPopover 
        open={popover.open} 
        anchorEl={popover.anchorEl} 
        onClose={popover.onClose}
      >
        <MenuList sx={{ width: 160, minHeight: 72 }}>
          {allLangs.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => handleChangeLang(option.value as LanguageValue)}
            >
              <FlagIcon code={option.countryCode} sx={{ mr: 1 }} />
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
} 