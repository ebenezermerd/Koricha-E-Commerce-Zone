// @mui
import { Stack, RadioGroup, StackProps } from '@mui/material';
//
import ReviewProgressItem from './ReviewProgressItem';

// ----------------------------------------------------------------------

type ReviewProgressProps = {
  ratings: {
    rating: number;
    count: number;
  }[];
};

// ----------------------------------------------------------------------

export default function ReviewProgress({ ratings, ...other }: ReviewProgressProps & StackProps) {
  const totals = ratings.reduce((accumulator, curr) => accumulator + curr.count, 0);

  return (
    <RadioGroup>
      <Stack spacing={2} {...other}>
        {ratings.map((rating, index) => (
          <ReviewProgressItem key={rating.rating} rating={{ value: `${rating.rating}star`, number: rating.count }} index={index} totals={totals} />
        ))}
      </Stack>
    </RadioGroup>
  );
}
