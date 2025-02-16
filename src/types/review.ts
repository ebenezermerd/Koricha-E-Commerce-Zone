// ----------------------------------------------------------------------

import { IDateValue } from "./product";

// Type for creating/updating reviews (matches backend requirements)
export type IReviewPayload = {
  product_id: string;
  rating: number;
  comment: string;
  name: string;
  attachments?: string[];
};

// Type for review response from backend
export type IProductReviewProps = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string | null;
  postedAt: IDateValue;
  isPurchased: boolean;
  attachments: string[];
  product_id: string;
};

// Type for review response meta data
export type IReviewMeta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
};

// Type for complete review response
export type IReviewResponse = {
  reviews: IProductReviewProps[];
  meta: IReviewMeta;
};
