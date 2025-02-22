// @mui
import {
  Box,
  Stack,
  Rating,
  Button,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/iconify';
//
import { ReviewProgress } from '../components';
import { IProductReviewProps } from 'types/review';

// ----------------------------------------------------------------------

type Props = {
  reviewsNumber: number;
  ratingsNumber: number;
  reviews: IProductReviewProps[];
  onOpenForm: VoidFunction;
};

export default function ReviewSummary({ reviewsNumber, ratingsNumber, reviews, onOpenForm }: Props) {
  // Calculate the number of reviews for each star rating
  const ratings = [1, 2, 3, 4, 5].map((star) => ({
    rating: star,
    count: reviews.filter((review) => review.rating === star).length,
  }));

  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 2 },
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Typography variant="h4">Reviews</Typography>

            <Stack spacing={2} direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography variant="h2"> {ratingsNumber.toFixed(1)}</Typography>

              <Stack spacing={0.5}>
                <Rating
                  value={ratingsNumber}
                  readOnly
                  precision={0.1}
                  sx={{
                    '& svg': {
                      color: 'text.primary',
                    },
                  }}
                />
                <Typography variant="body2">{fShortenNumber(reviewsNumber)} reviews</Typography>
              </Stack>
            </Stack>

            <Button
              size="medium"
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:edit" />}
              onClick={onOpenForm}
            >
              Write a Review
            </Button>
          </Grid>

          <Grid xs={12} md={4}>
            <ReviewProgress ratings={ratings} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
