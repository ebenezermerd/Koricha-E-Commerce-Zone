import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// types
import { ITestimonialProps } from 'src/types/testimonial';

// ----------------------------------------------------------------------

export function useGetTestimonials() {
  const URL = endpoints.te;

  const { data, isLoading, error, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      testimonials: data?.testimonials || [],
      testimonialsLoading: isLoading,
      testimonialsError: error,
      testimonialsEmpty: !isLoading && !data?.testimonials.length,
      testimonialsMeta: {
        ...data?.meta,
        isEmpty: !isLoading && !data?.testimonials.length,
        isError: !!error,
      },
      testimonialsMutate: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

export function useGetTestimonial(testimonialId: string) {
  const URL = testimonialId ? `${endpoints.testimonials.details}/${testimonialId}` : '';

  const { data, isLoading, error, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      testimonial: data?.testimonial || null,
      testimonialLoading: isLoading,
      testimonialError: error,
      testimonialMutate: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
} 