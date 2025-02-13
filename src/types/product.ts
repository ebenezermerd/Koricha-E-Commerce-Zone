// ----------------------------------------------------------------------

export type IProductItemHeroProps = {
  id: string;
  title: string;
  caption: string;
  coverImg: string;
  label: string;
};

export type IDateValue = string | number | null;

export type IProductItemCompareProps = {
  id: string;
  name: string;
  price: number;
  coverImg: string;
  rating: number;
  details: string[];
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  postedAt: IDateValue;
  isPurchased?: boolean;
  attachments?: string[];
};

export type IProductItemProps = {
  id: string;
  name: string;
  label: string;
  caption: string;
  description: string;
  coverImg: string;
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
  available: number;
  totalSold: number;
  totalRatings: number;
  totalReviews: number;
  createdAt: IDateValue;
  inventoryType: string;
  subDescription: string;
  isPublished: boolean;
  reviews: IProductReview[];
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
  filterTag: string[];
  filterStock: boolean;
  filterBrand: string[];
  filterShipping: string[];
  filterCategories: string;
  filterRating: string | null;
  filterGender: string;
  filterColor: string[];
  filterPrice: {
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
