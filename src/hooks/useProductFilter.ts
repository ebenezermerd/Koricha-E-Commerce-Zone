import useSWR from 'swr';
import axios from 'src/utils/axios';
import { IProductFiltersProps } from 'src/types/product';

const fetcher = (url: string, params: any) => 
  axios.get(url, { params }).then(res => res.data);

export interface UseProductFilterOptions {
  initialData?: any;
  revalidateOnMount?: boolean;
}

export interface ICategoryItem {
  id: number;
  name: string;
  slug: string;
  group: string;
  description: string;
  coverImg: string | null;
  isActive: boolean;
}

export interface Category extends ICategoryItem {
  children?: ICategoryItem[];
}

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    'api/products/categories',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
}

export function useProductFilter(filters: IProductFiltersProps, sort: string, page: number = 1, viewMode: string) {
  const getQueryParams = () => {
    const params: Record<string, any> = {
      sort: sort || 'latest',
      page,
      per_page: viewMode === 'list' ? 12 : 20,
    };
    
    if (filters.filterCategories) {
      params.categoryId = filters.filterCategories.id;
    }

    if (filters.filterBrand.length > 0) {
      params.brandIds = JSON.stringify(filters.filterBrand.map(b => b.id));
    }

    if (filters.filterPrice && (filters.filterPrice.start > 0 || filters.filterPrice.end > 0)) {
      params.priceRange = JSON.stringify(filters.filterPrice);
    }

    if (filters.filterColor?.length) {
      params.colors = filters.filterColor;
    }

    if (filters.filterGender) {
      params.gender = filters.filterGender;
    }

    if (filters.filterTag && filters.filterTag.length > 0) {
      params.tags = filters.filterTag;
    }

    return params;
  };

  const { data, error, isLoading } = useSWR(
    ['api/products/filter', getQueryParams()],
    ([url, params]) => fetcher(url, params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
      keepPreviousData: true,
    }
  );

  return {
    products: data?.products || [],
    meta: data?.meta || null,
    isLoading,
    isError: error,
  };
}

export function useCategoryBrands(categoryId: number | null) {
  const { data, error, isLoading } = useSWR(
    categoryId ? `api/categories/${categoryId}/brands` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  return {
    brands: data || [],
    isLoading,
    isError: error,
  };
}

export function useColors() {
  const { data, error, isLoading } = useSWR(
    'api/products/colors',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  return {
    colors: data?.colors || [],
    isLoading,
    isError: error,
  };
}

export function useGenders() {
  const { data, error, isLoading } = useSWR(
    'api/products/genders',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  return {
    genders: data?.genders || [],
    isLoading,
    isError: error,
  };
}

export function useTags() {
  const { data, error, isLoading } = useSWR(
    'api/products/tags',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  return {
    tags: data?.tags || [],
    isLoading,
    isError: error,
  };
}

export function useLandingCategories() {
  const { data, error, isLoading } = useSWR(
    'api/products/categories/featured',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
    }
  );

  return {
    categories: data?.categories || [],
    isLoading,
    isError: error,
  };
} 