import { IProductReviewProps } from "./review";
import { Category } from "src/hooks/useProductFilter";
// ----------------------------------------------------------------------

export type IProductItemHeroProps = {
  id: string;
  title: string;
  caption: string;
  coverImg: string;
  label: string;
};

export type IDateValue = string | number | null;

export type IProductItemProps = {
  coverImg: any;
  id: string;
  name: string;
  label: string;
  caption: string;
  description: string;
  coverUrl: string;
  category: string;
  sold: number;
  price: number;
  rating: number;
  priceSale: number;
  inStock: number;
  review: number;
  images: string[];
  sku: string;
  code: string;
  taxes: number;
  tags: string[];
  sizes: string[];
  gender: string[];
  colors: string[];
  publish: 'published' | 'draft';
  quantity: number;
  quantity_threshold: number | null;
  additional_cost_type: 'percentage' | 'fixed' | null;
  additional_cost_percentage: number | null;
  additional_cost_fixed: number | null;
  available: number;
  totalSold: number;
  totalRatings: number;
  totalReviews: number;
  createdAt: IDateValue;
  inventoryType: string;
  subDescription: string;
  isPublished: boolean;
  reviews: IProductReviewProps[];
  vendor?: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
  brand: {
    id: string;
    name: string;
    description: string;
    logo?: string;
  };
};

export type IProductFiltersProps = {
  filterTag?: string[];
  filterStock?: boolean;
  filterBrand: { id: string; name: string; }[];
  filterShipping?: string[];
  filterCategories: Category | null;
  filterRating?: string | null;
  filterGender?: string;
  filterColor?: string[];
  filterPrice?: {
    start: number;
    end: number;
  };
};

export type IProductOrderProps = {
  id: string;
  item: string;
  price: number;
  status: string;
  orderId: string;
  deliveryDate: Date | string | number;
};
