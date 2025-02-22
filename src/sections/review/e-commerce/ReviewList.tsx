// @mui
import { Pagination, Box, CircularProgress, Stack, Card, CardContent, Typography, Rating } from '@mui/material';
// types
import { IProductReviewProps } from 'src/types/review';
//
import ReviewItem from './ReviewItem';
import { EmptyContent } from 'src/components/empty-content';
import LoadingScreen  from 'src/components/loading-screen';

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
    return <LoadingScreen />;
  }

  if (!reviews.length) {
    return <EmptyContent title="No Reviews Yet" description="Be the first to review this product!" />;
  }

  return (
    <Box sx={{ pt: 5 }}>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{review.name}</Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2">{review.comment}</Typography>
          </CardContent>
        </Card>
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
