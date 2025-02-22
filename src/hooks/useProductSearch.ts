import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';
import { IProductItemProps } from 'src/types/product';
import { IProductItem } from 'src/types/product-minimal';

export function useProductSearch(query: string) {
  const [results, setResults] = useState<IProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim()) {
      const searchProducts = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get('/api/products/search', {
            params: { q: query }
          });
          setResults(response.data.products);
        } catch (err) {
          setError('Failed to fetch search results');
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      };

      const debounceTimer = setTimeout(searchProducts, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setResults([]);
    }
  }, [query]);

  return { results, loading, error };
} 