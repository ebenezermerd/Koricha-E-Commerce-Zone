import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import {
  Box,
  Grid,
  Stack,
  Typography,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// components
import { useToast } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUpload,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// utils
import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const SupportFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email must be valid'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  orderNumber: Yup.string().nullable(),
  attachment: Yup.mixed().nullable().test(
    'fileSize',
    'File size is too large (max 5MB)',
    (value: any) => {
      if (!value) return true;
      return value.size <= MAX_FILE_SIZE;
    }
  ),
});

type FormValuesProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber: string | null;
  attachment: File | null;
};

export default function SupportContactForm() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  
  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
    attachment: null,
  };
  
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SupportFormSchema) as any,
    defaultValues,
  });
  
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  
  const onSubmit = async (data: FormValuesProps) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);
      
      if (data.orderNumber) {
        formData.append('order_number', data.orderNumber);
      }
      
      if (data.attachment) {
        formData.append('attachment', data.attachment);
      }
      
      const response = await axios.post(endpoints.support.inquiries.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSubmitSuccess(true);
      reset();
      toast.success('Your inquiry has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRemoveFile = () => {
    setValue('attachment', null);
  };
  
  return (
    <Box sx={{ py: { xs: 5, md: 10 } }}>
      <Typography variant="h3" sx={{ mb: 5, textAlign: { xs: 'center', md: 'left' } }}>
        Contact Our Support Team
      </Typography>
      
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          {submitSuccess ? (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                fontSize: '1rem',
                alignItems: 'center',
                '& .MuiAlert-icon': {
                  fontSize: 28,
                },
              }}
            >
              Thank you for your inquiry! Our support team will get back to you soon. You should receive a confirmation email shortly.
            </Alert>
          ) : (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <RHFTextField 
                    name="name" 
                    label="Your Name" 
                    placeholder="Enter your full name"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <RHFTextField 
                    name="email" 
                    label="Email Address" 
                    placeholder="example@email.com"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <RHFTextField 
                    name="orderNumber" 
                    label="Order Number (Optional)" 
                    placeholder="If your inquiry is related to an order, please provide the order number" 
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <RHFTextField 
                    name="subject" 
                    label="Subject" 
                    placeholder="Brief description of your inquiry"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <RHFTextField 
                    name="message" 
                    label="Message" 
                    multiline 
                    rows={6} 
                    placeholder="Please describe your question or issue in detail" 
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="eva:attach-2-fill" sx={{ mr: 1, width: 20, height: 20 }}/>
                      Attachment (Optional)
                    </Typography>
                    <RHFUpload
                      name="attachment"
                      maxSize={MAX_FILE_SIZE}
                      onDelete={handleRemoveFile}
                      accept={{
                        'image/*': [],
                        'application/pdf': [],
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="eva:info-outline" sx={{ mr: 0.5, width: 16, height: 16 }}/>
                      Supported formats: JPEG, PNG, PDF. Maximum size: 5MB.
                    </Typography>
                  </Stack>
                </Grid>
                
                <Grid item xs={12}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      mt: 2,
                      bgcolor: 'primary.main',
                      fontWeight: 600,
                      height: 48,
                    }}
                  >
                    Submit Inquiry
                  </LoadingButton>
                </Grid>
              </Grid>
            </FormProvider>
          )}
        </Grid>

        {/* Illustration */}
        <Grid 
          item 
          xs={12} 
          md={5} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            order: { xs: -1, md: 2 }, 
            mb: { xs: 3, md: 0 } 
          }}
        >
          <Box sx={{ maxWidth: 360, width: '100%', position: 'relative' }}>
            <Image
              alt="Support Center Illustration"
              src="/assets/illustrations/illustration_support.svg"
              sx={{
                width: '100%',
                height: 'auto',
              }}
            />
            <Box
              sx={{
                mt: 4,
                textAlign: 'center',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Typography variant="h6" paragraph>
                Need help?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Our support team is here to assist you with any questions or issues.
                We typically respond within 24-48 hours.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 