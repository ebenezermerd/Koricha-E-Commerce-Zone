import React, { useEffect, useState, useRef } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Skeleton } from '@mui/material';
// hooks
import { useGetProducts } from 'src/services/useProducts';
import { bgGradient } from 'src/utils/cssStyles';
import { useCarousel, Carousel } from 'src/components/carousel';
import { EcommerceProductItemHero } from '../product/item';
import { CarouselArrowBasicButtons } from 'src/components/carousel/components/carousel-arrow-buttons';
import { IProductItemProps } from 'src/types/product';
// config
import { HEADER } from 'src/config-global';

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Helper function to get pixel data from an image
const getImageData = (img: HTMLImageElement): ImageData | null => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
  
  try {
    return context.getImageData(0, 0, img.width, img.height);
  } catch (e) {
    console.error('Error getting image data:', e);
    return null;
  }
};

// Helper function to get dominant colors from image data
const getDominantColors = (imageData: ImageData, numColors: number = 5): Array<{r: number, g: number, b: number}> => {
  const pixelArray = imageData.data;
  const pixelMap = new Map<string, {r: number, g: number, b: number, count: number}>();
  
  // Sample pixels (every 5th pixel to improve performance)
  for (let i = 0; i < pixelArray.length; i += 20) {
    const r = pixelArray[i];
    const g = pixelArray[i + 1];
    const b = pixelArray[i + 2];
    const a = pixelArray[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    // Skip very dark or very light pixels
    const hsl = rgbToHsl(r, g, b);
    if (hsl.l < 10 || hsl.l > 90) continue;
    
    const key = `${r}-${g}-${b}`;
    if (pixelMap.has(key)) {
      const pixel = pixelMap.get(key)!;
      pixel.count++;
    } else {
      pixelMap.set(key, { r, g, b, count: 1 });
    }
  }
  
  // Convert map to array and sort by count
  const sortedColors = Array.from(pixelMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, numColors)
    .map(({ r, g, b }) => ({ r, g, b }));
  
  return sortedColors;
};

// Helper function to create a gradient style from colors
const createGradientStyle = (colors: Array<{r: number, g: number, b: number}>, opacity: number = 0.7) => {
  if (colors.length === 0) return {};
  
  if (colors.length === 1) {
    const { r, g, b } = colors[0];
    return {
      background: `rgba(${r}, ${g}, ${b}, ${opacity})`,
    };
  }
  
  const gradientStops = colors.map(({ r, g, b }, index) => {
    const percent = (index / (colors.length - 1)) * 100;
    return `rgba(${r}, ${g}, ${b}, ${opacity}) ${percent}%`;
  }).join(', ');
  
  return {
    background: `linear-gradient(135deg, ${gradientStops})`,
  };
};

export default function EcommerceLandingHero() {
  const theme = useTheme();
  const { products, productsLoading } = useGetProducts();
  const [heroHeight, setHeroHeight] = useState('calc(100vh - 88px)');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState<any>({});
  const [productBackgrounds, setProductBackgrounds] = useState<Record<string, any>>({});
  const carouselRef = useRef<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update hero height based on screen size
  useEffect(() => {
    const updateHeroHeight = () => {
      const isMobile = window.innerWidth < theme.breakpoints.values.md;
      const headerHeight = isMobile ? HEADER.H_MOBILE : HEADER.H_MAIN_DESKTOP;
      setHeroHeight(`calc(100vh - ${headerHeight}px)`);
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeroHeight);
    };
  }, [theme.breakpoints.values.md]);

  const heroProducts = products
    ?.filter((product: IProductItemProps) => product.rating >= 4 || product.inStock > 0)
    .slice(0, 4)
    .map((product: IProductItemProps, index: number) => ({
      id: product.id,
      title: `${product.subDescription} - ${product.name}`,
      caption: product.caption || product.subDescription || product.description.slice(0, 120),
      coverImg: product.coverImg,
      path: `/products/${product.id}`,
      label: product.saleLabel.enabled ? product.saleLabel.content : (product.newLabel.enabled ? product.newLabel.content : 'New'),
    }));

  const carousel = useCarousel({
    slidesToShow: 1,
    loop: true,
    direction: 'ltr',
    axis: 'x',
  });

  // Watch for slide changes using the selectedIndex from dots
  useEffect(() => {
    // Mark as transitioning when slide changes
    setIsTransitioning(true);
    
    // Set a small delay to ensure the transition effect is visible
    const timer = setTimeout(() => {
      setCurrentProductIndex(carousel.dots.selectedIndex);
      setIsTransitioning(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [carousel.dots.selectedIndex]);

  // Pre-load and extract colors from all product images
  useEffect(() => {
    if (!heroProducts?.length) return;
    
    const loadBackgroundsForProducts = async () => {
      const backgrounds: Record<string, any> = {};
      
      // Process each product image to extract colors
      for (const product of heroProducts) {
        if (!product.coverImg) continue;
        
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        try {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = product.coverImg;
          });
          
          const imageData = getImageData(img);
          if (!imageData) continue;
          
          const dominantColors = getDominantColors(imageData, 3);
          if (dominantColors.length) {
            backgrounds[product.id] = createGradientStyle(dominantColors, 0.85);
          }
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
      
      setProductBackgrounds(backgrounds);
      
      // Set initial background
      if (heroProducts[0] && backgrounds[heroProducts[0].id]) {
        setBackgroundStyle(backgrounds[heroProducts[0].id]);
      }
    };
    
    loadBackgroundsForProducts();
  }, [heroProducts]);

  // Update background when current product changes
  useEffect(() => {
    if (!heroProducts?.length || currentProductIndex >= heroProducts.length) return;
    
    const currentProduct = heroProducts[currentProductIndex];
    if (!currentProduct?.id) return;
    
    const background = productBackgrounds[currentProduct.id];
    if (background) {
      setBackgroundStyle(background);
    }
  }, [currentProductIndex, heroProducts, productBackgrounds]);

  if (productsLoading) {
    return (
      <Box sx={{ height: heroHeight, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton variant="rectangular" height="100%" width="100%" />
      </Box>
    );
  }

  if (!products?.length || !heroProducts?.length) {
    return null;
  }
  
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.5s ease-in-out',
          opacity: isTransitioning ? 0.9 : 1,
          ...backgroundStyle,
        }}
      >
        <Carousel ref={carouselRef} carousel={carousel}>
          {heroProducts.map((product: any) => (
            <EcommerceProductItemHero 
              key={product.id} 
              product={product} 
            />
          ))}
        </Carousel>

        <CarouselArrowBasicButtons
          {...carousel.arrows}
          sx={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '50%',
            transform: 'translateY(-50%)',
            px: 2,
            '& .arrow-button': {
              p: 0.5,
              width: 40,
              height: 40,
              opacity: 0.8,
              color: 'common.white',
              background: alpha(theme.palette.grey[900], 0.48),
              borderRadius: '50%',
              '&:hover': {
                opacity: 1,
                background: alpha(theme.palette.grey[900], 0.72),
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}