import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#E2D9D1',
  400: '#C4B8B0',
  500: '#9E8E82',
  600: '#776B61',
  700: '#564E47',
  800: '#362F2D',
  900: '#1E1917',
};

const PRIMARY = {
  lighter: '#EFE6DD',
  light: '#D4B8A5',
  main: '#8B593E', // Rich coffee brown
  dark: '#5E3A28',
  darker: '#3C2419',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#F5E6D3',
  light: '#DBC1A7',
  main: '#A67B5B', // Latte brown
  dark: '#715241',
  darker: '#46332A',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#E8F4F8',
  light: '#B1D5E4',
  main: '#6A95A8', // Muted blue-grey
  dark: '#456878',
  darker: '#2A414D',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E3EBE3',
  light: '#B8CEB8',
  main: '#739073', // Forest sage
  dark: '#4D624D',
  darker: '#2E3C2E',
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF1E0',
  light: '#FFD4A8',
  main: '#D4925E', // Caramel
  dark: '#A66939',
  darker: '#744626',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FBDED3',
  light: '#E5A79A',
  main: '#C25F4E', // Rustic red
  dark: '#933F31',
  darker: '#662B21',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { paper: '#FFFFFF', default: '#FDFBF9', neutral: GREY[100] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
}
