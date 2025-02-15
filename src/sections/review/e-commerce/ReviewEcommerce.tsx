import { useState } from 'react';
// @mui
import { Card, Stack, Button, Rating, Typography, CardProps, CardHeader, Container } from '@mui/material';
// _mock
import { _reviews } from 'src/_mock';
// types
import { IProductReview } from 'src/types/product';
// components
import Iconify from 'src/components/iconify';
import ReviewNewForm from '../components/ReviewNewForm';
import ReviewList from './ReviewList';
import ReviewSummary from './ReviewSummary';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  ratingsNumber: number;
  reviewsNumber: number;
  onOpenForm?: VoidFunction;
}

export default function ReviewEcommerce({ 
  ratingsNumber = 0,
  reviewsNumber = 0,
  onOpenForm,
  ...other 
}: Props) {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
    if (onOpenForm) {
      onOpenForm();
    }
  };

  return (
    <Card {...other}>
      <CardHeader title="Product Reviews" />

      <ReviewSummary
        ratingsNumber={ratingsNumber}
        reviewsNumber={reviewsNumber}
        onOpenForm={() => setOpenForm(true)}
      />

      <Container>
        <ReviewList reviews={_reviews} />
      </Container>

      <ReviewNewForm open={openForm} onClose={() => setOpenForm(false)} />
    </Card>
  );
}
