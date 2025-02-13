import { IProductItemProps } from "types/product";

export const PRODUCT_GENDER_OPTIONS = [
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
    { value: 'Kids', label: 'Kids' },
  ];
  

export const PRODUCT_TAGS = [
    `Technology`,
    `Health and Wellness`,
    `Travel`,
    `Finance`,
    `Education`,
    `Food and Beverage`,
    `Fashion`,
    `Home and Garden`,
    `Sports`,
    `Entertainment`,
    `Business`,
    `Science`,
    `Automotive`,
    `Beauty`,
    `Fitness`,
    `Lifestyle`,
    `Real Estate`,
    `Parenting`,
    `Pet Care`,
    `Environmental`,
    `DIY and Crafts`,
    `Gaming`,
    `Photography`,
    `Music`,
  ];

  export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];
  
  export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
  
  export const PRODUCT_COLOR_OPTIONS = [
    '#FF4842',
    '#1890FF',
    '#FFC0CB',
    '#00AB55',
    '#FFC107',
    '#7F00FF',
    '#000000',
    '#FFFFFF',
  ];
  
  export const PRODUCT_COLOR_NAME_OPTIONS = [
    { value: '#FF4842', label: 'Red' },
    { value: '#1890FF', label: 'Blue' },
    { value: '#FFC0CB', label: 'Pink' },
    { value: '#00AB55', label: 'Green' },
    { value: '#FFC107', label: 'Yellow' },
    { value: '#7F00FF', label: 'Violet' },
    { value: '#000000', label: 'Black' },
    { value: '#FFFFFF', label: 'White' },
  ];
  
  export const PRODUCT_SIZE_OPTIONS = [
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '8.5', label: '8.5' },
    { value: '9', label: '9' },
    { value: '9.5', label: '9.5' },
    { value: '10', label: '10' },
    { value: '10.5', label: '10.5' },
    { value: '11', label: '11' },
    { value: '11.5', label: '11.5' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
  ];
  
  export const PRODUCT_STOCK_OPTIONS = [
    { value: 'in stock', label: 'In stock' },
    { value: 'low stock', label: 'Low stock' },
    { value: 'out of stock', label: 'Out of stock' },
  ];
  
  export const PRODUCT_PUBLISH_OPTIONS = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
  ];
  
  export const PRODUCT_SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High - Low' },
    { value: 'priceAsc', label: 'Price: Low - High' },
  ];
  
  export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
    { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'] },
    { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'] },
    { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
  ];
  
  export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];
  
  export const PRODUCT_SIZES = {
    shoes: [
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '8.5', label: '8.5' },
      { value: '9', label: '9' },
      { value: '9.5', label: '9.5' },
      { value: '10', label: '10' },
      { value: '10.5', label: '10.5' },
      { value: '11', label: '11' },
      { value: '11.5', label: '11.5' },
      { value: '12', label: '12' },
      { value: '13', label: '13' },
      { value: '6W', label: '6 Wide' },
      { value: '7W', label: '7 Wide' },
      { value: '8W', label: '8 Wide' },
      { value: '9W', label: '9 Wide' },
      { value: '10W', label: '10 Wide' },
      { value: '11W', label: '11 Wide' },
    ],
    clothing: [
      { value: 'XS', label: 'XS' },
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
      { value: 'XXL', label: 'XXL' },
    ],
    accessories: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
    default: [{ value: 'OS', label: 'One Size' }],
  };
  
  export const PRODUCT_CATEGORY_SIZE_MAP: { [key: string]: keyof typeof PRODUCT_SIZES } = {
    Shirts: 'clothing',
    'T-shirts': 'clothing',
    Jeans: 'clothing',
    Leather: 'clothing',
    Suits: 'clothing',
    Blazers: 'clothing',
    Trousers: 'clothing',
    Waistcoats: 'clothing',
    Apparel: 'clothing',
    Shoes: 'shoes',
    'Backpacks and bags': 'accessories',
    Bracelets: 'accessories',
    'Face masks': 'accessories',
  };
  
  export const PRODUCT_BRAND_OPTIONS: { [key: string]: { name: string; description: string }[] } = {
    Shirts: [
      { name: 'Polo Ralph Lauren', description: 'Polo Ralph Lauren Brand' },
      { name: 'Tommy Hilfiger', description: 'Tommy Hilfiger Brand' },
    ],
    'T-shirts': [
      { name: 'Nike', description: 'Nike Brand' },
      { name: 'Adidas', description: 'Adidas Brand' },
    ],
    Jeans: [
      { name: 'Levi\'s', description: 'Levi\'s Brand' },
      { name: 'Wrangler', description: 'Wrangler Brand' },
    ],
    Leather: [
      { name: 'Coach', description: 'Coach Brand' },
      { name: 'Fossil', description: 'Fossil Brand' },
    ],
    Accessories: [
      { name: 'Rolex', description: 'Rolex Brand' },
      { name: 'Louis Vuitton', description: 'Louis Vuitton Brand' },
    ],
    Shoes: [
      { name: 'Nike', description: 'Nike Brand' },
      { name: 'Adidas', description: 'Adidas Brand' },
      { name: 'Puma', description: 'Puma Brand' },
    ],
    'Backpacks and bags': [
      { name: 'Herschel Supply Co.', description: 'Herschel Supply Co. Brand' },
      { name: 'JanSport', description: 'JanSport Brand' },
    ],
    Bracelets: [
      { name: 'Pandora', description: 'Pandora Brand' },
      { name: 'Tiffany & Co.', description: 'Tiffany & Co. Brand' },
    ],
    'Face masks': [
      { name: 'Under Armour', description: 'Under Armour Brand' },
      { name: 'Adidas', description: 'Adidas Brand' },
    ],
    Suits: [
      { name: 'Hugo Boss', description: 'Hugo Boss Brand' },
      { name: 'Armani', description: 'Armani Brand' },
    ],
    Blazers: [
      { name: 'Ralph Lauren', description: 'Ralph Lauren Brand' },
      { name: 'Brooks Brothers', description: 'Brooks Brothers Brand' },
    ],
    Trousers: [
      { name: 'Dockers', description: 'Dockers Brand' },
      { name: 'Bonobos', description: 'Bonobos Brand' },
    ],
    Waistcoats: [
      { name: 'Ted Baker', description: 'Ted Baker Brand' },
      { name: 'Paul Smith', description: 'Paul Smith Brand' },
    ],
    Apparel: [
      { name: 'Gucci', description: 'Gucci Brand' },
      { name: 'Versace', description: 'Versace Brand' },
    ],
  };
  
export const LANDING_CATEGORIES = [
  {
    group: 'Clothing',
    items: [
      { 
        label: 'Men Clothes', 
        icon: '/assets/icons/e-commerce/ic_men_clothes.svg',
        path: '/products/men',
        categories: ['Shirts', 'T-shirts', 'Suits', 'Blazers', 'Trousers']
      },
      { 
        label: 'Women Clothes',
        icon: '/assets/icons/e-commerce/ic_women_clothes.svg',
        path: '/products/women',
        categories: ['Dresses', 'Tops', 'Skirts', 'Accessories']
      },
    ]
  },
  {
    group: 'Accessories',
    items: [
      { 
        label: 'Watches', 
        icon: '/assets/icons/e-commerce/ic_watches.svg',
        path: '/products/watches',
        categories: ['Luxury', 'Sport', 'Smart Watches']
      },
      { 
        label: 'Sport & Outdoor',
        icon: '/assets/icons/e-commerce/ic_sport.svg',
        path: '/products/sport',
        categories: ['Equipment', 'Clothing', 'Shoes']
      },
    ]
  },
  {
    group: 'Electronics',
    items: [
      { 
        label: 'Mobile', 
        icon: '/assets/icons/e-commerce/ic_mobile.svg',
        path: '/products/mobile',
        categories: ['Smartphones', 'Tablets', 'Accessories']
      },
      { 
        label: 'Laptop',
        icon: '/assets/icons/e-commerce/ic_laptop.svg',
        path: '/products/laptop',
        categories: ['Gaming', 'Business', 'Student']
      },
      { 
        label: 'Headphones',
        icon: '/assets/icons/e-commerce/ic_headphones.svg',
        path: '/products/audio',
        categories: ['Wireless', 'Gaming', 'Sport']
      },
    ]
  },
];

export const productConfig = {
  colors: PRODUCT_COLOR_NAME_OPTIONS,
  
  getSizesByCategory: (category: string) => {
    const sizeType = PRODUCT_CATEGORY_SIZE_MAP[category];
    return PRODUCT_SIZES[sizeType || 'default'];
  },
  
  getBrandsByCategory: (category: string) => {
    return PRODUCT_BRAND_OPTIONS[category] || [];
  },
  
  categories: PRODUCT_CATEGORY_GROUP_OPTIONS,
  
  // Helper to get brand logo
  getBrandLogo: (brandName: string) => {
    const normalizedName = brandName.toLowerCase().replace(/\s+/g, '');
    return `/assets/logo/${normalizedName}.svg`;
  },
  
  tags: PRODUCT_TAGS,
  
  genders: PRODUCT_GENDER_OPTIONS,
  
  inventory: PRODUCT_STOCK_OPTIONS,
  
  // Helper to get inventory status
  getInventoryStatus: (quantity: number): string => {
    if (quantity <= 0) return 'out of stock';
    if (quantity < 10) return 'low stock';
    return 'in stock';
  },

  // Helper to get inventory label
  getInventoryLabel: (status: string): string => {
    const option = PRODUCT_STOCK_OPTIONS.find(opt => opt.value === status);
    return option?.label || 'Unknown';
  },
  
  landing: {
    categories: LANDING_CATEGORIES,
    
    // Helper to get featured products for hero
    getHeroProducts: (products: IProductItemProps[]) => {
      return products
        .filter(product => 
          product.rating >= 4 && 
          product.totalSold > 50 &&
          product.inStock > 0
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          title: product.name,
          description: product.caption || product.description.slice(0, 120),
          image: product.coverImg,
          path: `/products/${product.id}`,
          color: product.colors[0] || '#000000',
          priceSale: product.priceSale,
          price: product.price,
          label: product.label,
        }));
    },
  },
}; 