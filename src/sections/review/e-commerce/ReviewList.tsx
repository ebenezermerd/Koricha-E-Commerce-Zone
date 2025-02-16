// @mui
import { Pagination, Box, CircularProgress } from '@mui/material';
// types
import { IProductReviewProps } from 'src/types/review';
//
import ReviewItem from './ReviewItem';

// ----------------------------------------------------------------------

type Props = {
  reviews: IProductReviewProps[];
  loading?: boolean;
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};

export default function ReviewList({ reviews, loading, pagination }: Props) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 5 }}>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          name={review.name}
          avatarUrl={review.avatarUrl}
          postedAt={review.postedAt}
          comment={review.comment}
          rating={review.rating}
          helpful={review.helpful}
          isPurchased={review.isPurchased}
          attachments={review.attachments}
        />
      ))}

      {pagination && (
        <Pagination
          count={pagination.last_page}
          page={pagination.current_page}
          color="primary"
          size="large"
          sx={{
            mt: 5,
            mb: 10,
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </Box>
  );
}
