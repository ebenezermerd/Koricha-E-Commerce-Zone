import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useMemo } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';
import { 
  IProductReviewProps, 
  IReviewResponse, 
  IReviewPayload 
} from 'src/types/review';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Fetch reviews with optional product_id filter
const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

// Create review mutation
const createReview = async (url: string, { arg }: { arg: IReviewPayload }) => {
  try {
    const response = await axios.post(url, arg);
    return response.data.review as IProductReviewProps;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Please login to submit a review');
    }
    throw error;
  }
};

// Update review mutation
const updateReview = async (
  url: string, 
  { arg }: { arg: { id: string; data: Partial<IReviewPayload> } }
) => {
  const response = await axios.put(`${url}/${arg.id}`, arg.data);
  return response.data.review as IProductReviewProps;
};

// Mark review as helpful mutation
const markHelpful = async (url: string, { arg }: { arg: string }) => {
  const response = await axios.post(`${url}/${arg}/helpful`);
  return response.data;
};

export function useGetReviews(productId?: string) {
  const { data, isLoading, error, mutate } = useSWR<IReviewResponse>(
    productId ? `${endpoints.reviews.list}?product_id=${productId}` : endpoints.reviews.list,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      reviews: data?.reviews || [],
      meta: data?.meta,
      reviewsLoading: isLoading,
      reviewsError: error,
      reviewsEmpty: !isLoading && !data?.reviews.length,
      revalidateReviews: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

export function useReviewActions() {
  const { authenticated, user } = useAuthContext();

  const { trigger: createTrigger, isMutating: isCreating } = useSWRMutation(
    endpoints.reviews.create,
    createReview
  );

  const { trigger: updateTrigger, isMutating: isUpdating } = useSWRMutation(
    endpoints.reviews.update(''),
    updateReview
  );

  const { trigger: helpfulTrigger, isMutating: isMarkingHelpful } = useSWRMutation(
    endpoints.reviews.helpful(''),
    markHelpful
  );

  const createNewReview = async (reviewData: IReviewPayload) => {
    if (!authenticated) {
      throw new Error('Please login to submit a review');
    }

    try {
      const result = await createTrigger({ ...reviewData, user_id: user?.id });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateExistingReview = async (reviewId: string, reviewData: Partial<IReviewPayload>) => {
    try {
      const result = await updateTrigger({ id: reviewId, data: reviewData });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const markReviewHelpful = async (reviewId: string) => {
    try {
      const result = await helpfulTrigger(reviewId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    createNewReview,
    updateExistingReview,
    markReviewHelpful,
    isCreating,
    isUpdating,
    isMarkingHelpful,
  };
} 