import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Button,
  Rating,
  Dialog,
  Typography,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
// hooks
import { useReviewActions } from 'src/services/useReview';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  product_id: string;
  rating: number;
  review: string;
  name: string;
};

interface Props extends DialogProps {
  onClose: VoidFunction;
  open: boolean;
  onSubmitSuccess: VoidFunction;
  productId: string;
}

// ----------------------------------------------------------------------

export default function ReviewNewForm({ onClose, productId, onSubmitSuccess, open, ...other }: Props) {
  const { createNewReview, isCreating } = useReviewActions();

  const ReviewSchema = Yup.object().shape({
    product_id: Yup.string().required(),
    rating: Yup.number().required('Rating is required'),
    review: Yup.string().required('Review is required'),
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    rating: 0,
    review: '',
    name: '',
    product_id: productId,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createNewReview({
        product_id: productId,
        rating: data.rating,
        comment: data.review,
        name: data.name,
      });
      
      reset();
      onClose();
      onSubmitSuccess();
      toast.success('Review submitted successfully!');
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Please login to submit a review') {
        toast.error('Please login to submit a review');
        localStorage.setItem('pendingReview', JSON.stringify(data));
        window.location.href = paths.auth.jwt.signIn;
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit review. Please try again.');
      }
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Write a Review</DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Rating</Typography>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={Number(field.value)}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
              {errors.rating && (
                <FormHelperText error>{errors.rating.message}</FormHelperText>
              )}
            </Stack>

            <RHFTextField
              name="review"
              label="Review"
              multiline
              rows={3}
              placeholder="Write your review here..."
            />

            <RHFTextField name="name" label="Name" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isCreating}>
            Post Review
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
