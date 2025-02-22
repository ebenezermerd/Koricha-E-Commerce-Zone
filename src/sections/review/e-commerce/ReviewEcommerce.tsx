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
import { IProductReviewProps } from 'types/review';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  productId: string;
  ratingsNumber: number;
  reviewsNumber: number;
  reviews: IProductReviewProps[];
  onOpenForm?: VoidFunction;
}

export default function ReviewEcommerce({ 
  productId,
  ratingsNumber = 0,
  reviewsNumber = 0,
  reviews,
  onOpenForm,
  ...other 
}: Props) {
  const [openForm, setOpenForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2; // Number of reviews to display per page

  const handleOpenForm = () => {
    setOpenForm(true);
    if (onOpenForm) {
      onOpenForm();
    }
  };

  const handleReviewSubmitted = () => {
    setOpenForm(false);
  };

  // Calculate the current reviews to display
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card {...other}>
      <CardHeader title="Product Reviews" />

      <ReviewSummary
        ratingsNumber={ratingsNumber}
        reviews={reviews}
        reviewsNumber={reviewsNumber}
        onOpenForm={handleOpenForm}
      />

      <Container>
        <ReviewList 
          reviews={currentReviews} 
          loading={false}
        />
      </Container>

      {/* Pagination Controls */}
      <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="body2">Page {currentPage}</Typography>
        <Button 
          variant="outlined" 
          onClick={() => paginate(currentPage + 1)} 
          disabled={indexOfLastReview >= reviews.length}
        >
          Next
        </Button>
      </Stack>

      <ReviewNewForm 
        open={openForm} 
        onClose={() => setOpenForm(false)}
        productId={productId}
        onSubmitSuccess={handleReviewSubmitted}
      />
    </Card>
  );
}
