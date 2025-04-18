import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';
import { IProductItem } from 'src/types/product-minimal';

export interface AdvancedSearchParams {
  q: string;
  variant?: string;
  include_subcategories?: boolean;
  limit?: number;
}

export interface CategoryInfo {
  id: number;
  name: string;
  group: string;
  type: 'category' | 'subcategory';
}

export interface VariantInfo {
  id?: number;
  name: string;
  group?: string;
  type: 'category' | 'subcategory' | 'group';
  parentId?: number;
}

export interface AdvancedSearchResults {
  products: IProductItem[];
  meta: {
    total_found: number;
    search_params: {
      query: string;
      variant: VariantInfo | null;
      category_constraints: CategoryInfo[] | 'none';
    }
  }
}

/**
 * A hook for using the advanced product search API
 * 
 * @param {AdvancedSearchParams} searchParams - The search parameters
 * @returns Search results, loading state, and error state
 */
export function useAdvancedProductSearch(searchParams: AdvancedSearchParams) {
  const [results, setResults] = useState<AdvancedSearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only search if there's a query
    if (searchParams.q && searchParams.q.trim()) {
      const searchProducts = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await axios.get('/api/products/advanced-search', {
            params: searchParams
          });
          
          setResults(response.data);
        } catch (err) {
          console.error('Advanced search error:', err);
          setError('Failed to fetch search results');
        } finally {
          setLoading(false);
        }
      };

      // Debounce for better UX
      const debounceTimer = setTimeout(searchProducts, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      // Clear results if query is empty
      setResults(null);
    }
  }, [searchParams]);

  return { 
    results: results?.products || [], 
    meta: results?.meta,
    loading, 
    error 
  };
}

/**
 * Search products with a specific variant (category, subcategory, or group)
 * 
 * @param {string} query - The search query
 * @param {string} variant - The category, subcategory, or group name
 * @param {boolean} includeSubcategories - Whether to include subcategories (default: true)
 * @returns Search results, loading state, and error state
 */
export function useVariantSearch(query: string, variant?: string, includeSubcategories = true) {
  const searchParams: AdvancedSearchParams = {
    q: query,
    variant: variant,
    include_subcategories: includeSubcategories,
  };

  return useAdvancedProductSearch(searchParams);
} 