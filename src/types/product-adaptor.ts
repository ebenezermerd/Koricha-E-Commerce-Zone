// src/types/product-adapter.ts

import { IProductItem as MinimalProduct } from './product-minimal';
import { IProductItemProps as ZoneProduct } from './product';
import { PRODUCT_COLOR_NAME_OPTIONS, PRODUCT_CATEGORY_GROUP_OPTIONS, productConfig } from 'src/config/product-options';

export const adaptMinimalToZoneProduct = (minimalProduct: MinimalProduct): ZoneProduct => ({
  id: minimalProduct.id,
  name: minimalProduct.name,
  label: minimalProduct.newLabel.enabled ? 'new' : minimalProduct.saleLabel.enabled ? 'sale' : '',
  caption: minimalProduct.subDescription || '',
  description: minimalProduct.description,
  coverImg: minimalProduct.coverUrl,
  category: PRODUCT_CATEGORY_GROUP_OPTIONS.some(group => 
    group.classify.includes(minimalProduct.category)
  ) ? minimalProduct.category : PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[0],
  sold: minimalProduct.totalSold,
  price: minimalProduct.price,
  rating: minimalProduct.totalRatings || 0,
  priceSale: minimalProduct.priceSale || 0,
  inStock: minimalProduct.quantity,
  review: minimalProduct.totalReviews,
  images: minimalProduct.images,
  sku: minimalProduct.sku,
  code: minimalProduct.code,
  taxes: minimalProduct.taxes,
  tags: minimalProduct.tags.filter(tag => 
    productConfig.tags.includes(tag)
  ),
  sizes: minimalProduct.sizes.map(size => size),
  gender: minimalProduct.gender.filter(g => 
    productConfig.genders.some(opt => opt.value === g)
  ),
  colors: minimalProduct.colors.map(color => {
    const colorOption = PRODUCT_COLOR_NAME_OPTIONS.find((opt: { value: string; }) => opt.value === color);
    return colorOption ? color : color;
  }),
  publish: minimalProduct.publish,
  quantity: minimalProduct.quantity,
  available: minimalProduct.available,
  totalSold: minimalProduct.totalSold,
  totalRatings: minimalProduct.totalRatings,
  totalReviews: minimalProduct.totalReviews,
  createdAt: minimalProduct.createdAt,
  inventoryType: productConfig.getInventoryStatus(minimalProduct.quantity),
  subDescription: minimalProduct.subDescription,
  isPublished: minimalProduct.isPublished,
  reviews: minimalProduct.reviews,
  ratings: minimalProduct.ratings,
  saleLabel: minimalProduct.saleLabel,
  newLabel: minimalProduct.newLabel,
  vendor: minimalProduct.vendor,
  brand: {
    id: minimalProduct.brand?.id || '',
    name: minimalProduct.brand?.name || '',
    description: minimalProduct.brand?.description || '',
    logo: minimalProduct.brand?.name 
      ? `/assets/logo/${minimalProduct.brand.name.toLowerCase().replace(/\s+/g, '')}.svg`
      : '',
  },
});