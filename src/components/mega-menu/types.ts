import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

// Types for Products and Tags
type Products = {
  name: string;
  image: string;
  path: string;
};

type Tags = {
  name: string;
  path: string;
};

// Props for Menu Carousel and Hot Products
export type MenuCarouselProps = {
  products: Products[];
  numberShow?: number;
  sx?: SxProps<Theme>;
};

export type MenuHotProductsProps = {
  tags: Tags[];
};

// Type for Mega Menu Item Children
type MegaMenuChild = {
  subheader: string;
  items: {
    title: string;
    path: string;
  }[];
};

// Props for Parent Items
export type ParentItemProps = {
  title: string;
  path?: string;
  icon?: React.ReactElement | string; // For flexibility with icon strings or components
  open?: boolean;
  hasSub?: boolean;
  onClick?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
  component?: React.ReactNode;
  to?: string;
};

// Props for Mega Menu Items
export type MegaMenuItemProps = {
  title: string;
  path: string;
  icon: React.ReactElement | string;
  more?: {
    title: string;
    path: string;
  };
  products?: Products[];
  tags?: Tags[];
  children?: MegaMenuChild[]; // Clear structure for nested items
};
