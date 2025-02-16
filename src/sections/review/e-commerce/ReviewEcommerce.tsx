import { useState } from 'react';
// @mui
import { Card, Stack, Button, Rating, Typography, CardProps, CardHeader, Container } from '@mui/material';
// hooks
import { useGetReviews } from 'src/services/useReview';
// components
import Iconify from 'src/components/iconify';
import ReviewNewForm from '../components/ReviewNewForm';
import ReviewList from './ReviewList';
import ReviewSummary from './ReviewSummary';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  productId: string;
  ratingsNumber: number;
  reviewsNumber: number;
  onOpenForm?: VoidFunction;
}

export default function ReviewEcommerce({ 
  productId,
  ratingsNumber = 0,
  reviewsNumber = 0,
  onOpenForm,
  ...other 
}: Props) {
  const [openForm, setOpenForm] = useState(false);

  const { reviews, meta, reviewsLoading, revalidateReviews } = useGetReviews(productId);

  const handleOpenForm = () => {
    setOpenForm(true);
    if (onOpenForm) {
      onOpenForm();
    }
  };

  const handleReviewSubmitted = () => {
    setOpenForm(false);
    revalidateReviews();
  };

  return (
    <Card {...other}>
      <CardHeader title="Product Reviews" />

      <ReviewSummary
        ratingsNumber={ratingsNumber}
        reviewsNumber={reviewsNumber}
        onOpenForm={handleOpenForm}
      />

      <Container>
        <ReviewList 
          reviews={reviews} 
          loading={reviewsLoading}
          pagination={meta}
        />
      </Container>

      <ReviewNewForm 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        productId={productId}
        onSubmitSuccess={handleReviewSubmitted}
      />
    </Card>
  );
}
