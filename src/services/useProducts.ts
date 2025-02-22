import useSWR from 'swr';
import { useMemo } from 'react';
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';

import { adaptMinimalToZoneProduct } from 'src/types/product-adaptor';
import { IProductItem as MinimalProduct } from 'src/types/product-minimal';
import { IProductItemProps } from 'types/product';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

type MinimalProductsResponse = {
  products: MinimalProduct[];
};

type MinimalProductResponse = {
  product: MinimalProduct;
};

type MinimalSearchResponse = {
  results: MinimalProduct[];
};

// Fetch and adapt the response
const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export function useGetProducts() {
  const { data, isLoading, error, isValidating } = useSWR<MinimalProductsResponse>(
    endpoints.product.list,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      products: data?.products ? data.products.map(adaptMinimalToZoneProduct) : [] as IProductItemProps[],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products?.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );
 
  return memoizedValue;
}

export function useGetProduct(productId: string) {
  const { data, isLoading, error, isValidating, mutate } = useSWR<MinimalProductResponse>(
    productId ? `${endpoints.product.details}?productId=${productId}` : null,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      product: data?.product ? adaptMinimalToZoneProduct(data.product) : undefined,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
      revalidateProduct: mutate,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useSearchProducts(query: string) {
  const { data, isLoading, error, isValidating } = useSWR<MinimalSearchResponse>(
    query ? `${endpoints.product.search}?query=${query}` : null,
    fetcher,
    {
      ...swrOptions,
      keepPreviousData: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results ? data.results.map(adaptMinimalToZoneProduct) : [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results?.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}