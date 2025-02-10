// src/types/product-adapter.ts

import { IProductItem as MinimalProduct } from './product-minimal';
import { IProductItemProps as ZoneProduct } from './product';

export const adaptMinimalToZoneProduct = (minimalProduct: MinimalProduct): ZoneProduct => ({
  id: minimalProduct.id,
  name: minimalProduct.name,
  label: minimalProduct.newLabel.enabled ? 'new' : minimalProduct.saleLabel.enabled ? 'sale' : '',
  caption: minimalProduct.subDescription || '',
  description: minimalProduct.description,
  coverImg: minimalProduct.coverUrl,
  category: minimalProduct.category,
  sold: minimalProduct.totalSold,
  price: minimalProduct.price,
  rating: minimalProduct.totalRatings || 0,
  priceSale: minimalProduct.priceSale || 0,
  inStock: minimalProduct.available,
  review: minimalProduct.totalReviews,
  images: minimalProduct.images
});