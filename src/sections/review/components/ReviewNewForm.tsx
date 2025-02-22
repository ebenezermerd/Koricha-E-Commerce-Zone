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
  Alert,
} from '@mui/material';
// hooks
import { useReviewActions } from 'src/services/useReview';
import { useAuthContext } from 'src/auth/hooks';
import { useGetProduct } from 'src/services/useProducts';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { IReviewPayload } from 'src/types/review';

// ----------------------------------------------------------------------

type FormValuesProps = {
  rating: number;
  comment: string;
  name: string;
  product_id: string;
  user_id: string;
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
  const { user, authenticated } = useAuthContext();
  const { revalidateProduct } = useGetProduct(productId);
  
  const ReviewSchema = Yup.object().shape({
    product_id: Yup.string().required(),
    rating: Yup.number().required('Rating is required').min(1).max(5),
    comment: Yup.string().required('Review is required').max(1000),
    name: Yup.string().required('Name is required').max(255),
    user_id: Yup.string().required('User ID is required'),
  });

  const defaultValues = {
    rating: 0,
    comment: '',
    name: '',
    product_id: productId,
    user_id: user?.id,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: IReviewPayload) => {
    console.log('Form data before submission:', data);
    console.log('User ID:', user?.id);
    try {
      await createNewReview({ ...data, user_id: user?.id });
      reset();
      onClose();
      onSubmitSuccess();
      toast.success('Review submitted successfully!');
      revalidateProduct();
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.message === 'Please login to submit a review') {
        toast.error('Please login to submit a review');
        localStorage.setItem('pendingReview', JSON.stringify(data));
        window.location.href = `${paths.auth.jwt.signIn}?returnTo=${encodeURIComponent(window.location.pathname)}`;
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit review. Please try again.');
      }
    }
  };
console.log(isCreating, methods.formState.isValid)
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...other}>
        {!authenticated && (
            <Alert 
              severity="warning"
              variant="filled"
              icon={<Iconify icon="ic:round-warning" width={24} />}
              sx={{
                
                color: 'common.white',
                '& .MuiAlert-message': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  lineHeight: 0
                }
              }}
            >
              <Typography variant="subtitle2">
                Authentication Required
              </Typography>
              <Typography variant="body2">
                You need to be signed in to review this product. Please sign in to continue.
              </Typography>
            </Alert>
          )}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Write a Review</DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Rating</Typography>
              <Controller
                name="rating"
                control={methods.control}
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
              name="comment"
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

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isCreating}
            disabled={isCreating || !methods.formState.isValid}
          >
            Post Review
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
