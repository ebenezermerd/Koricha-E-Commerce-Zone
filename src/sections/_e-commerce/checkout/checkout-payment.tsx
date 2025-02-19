import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import Iconify from 'src/components/iconify';
import Form from 'src/components/hook-form';
import { useCheckout as useCheckoutContext } from '../checkout/context/checkout-context';
import { useCheckout as useCheckoutService } from 'src/services/useCheckout';
import { CheckoutSummary } from './checkout-summary';
import { CheckoutPaymentMethods } from './checkout-payment-methods';
import { CheckoutBillingInfo } from './checkout-billing-info';
import { CheckoutDelivery } from './checkout-delivery';
import { useCart } from 'src/contexts/cart-context';
import { toast } from 'src/components/snackbar';
import { PaymentMethod } from 'src/types/checkout';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
  { value: 0, label: 'Free', description: '3-5 days delivery' },
  { value: 100, label: 'Standard', description: '2-3 days delivery' },
  { value: 200, label: 'Express', description: '1-2 days delivery' },
];

// ----------------------------------------------------------------------

const PaymentSchema = zod.object({
  payment: zod.string().min(1, 'Payment is required'),
  delivery: zod.number(),
});

type PaymentFormValues = zod.infer<typeof PaymentSchema>;

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const checkout = useCheckoutContext();
  const checkoutService = useCheckoutService();
  const { dispatch: cartDispatch } = useCart();

  const defaultValues: PaymentFormValues = {
    delivery: 0,
    payment: '',
  };

  const methods = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!checkout.billing) {
        throw new Error('Billing address is required');
      }

      const { createNewOrder } = checkoutService;

      // Create order
      const deliveryMethod = DELIVERY_OPTIONS.find((opt) => opt.value === data.delivery);
      if (!deliveryMethod) {
        throw new Error('Invalid delivery method');
      }

      // Map cart items to required structure
      const formattedItems = checkout.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        coverUrl: item.product.coverImg,
        available: item.product.available,
        price: item.product.price,
        colors: item.colors || [],
        size: item.size || 'OS',
        quantity: item.quantity
      }));

      const baseOrder= {
        items: formattedItems,
        billing: checkout.billing,
        shipping: {
          address: checkout.billing.fullAddress,
          method: deliveryMethod,
          cost: data.delivery,
        },
        status: 'pending',
        discount: checkout.discount,
        total: checkout.total,
        subtotal: checkout.subtotal,
      }

      if (data.payment === 'chapa') {
      const chapaOrderData = {
        ...baseOrder,
        payment: {
          method: data.payment as PaymentMethod,
          amount: checkout.total,
          currency: 'ETB',
          tx_ref: `order-${Date.now()}`,
        },
        callback_url: `${window.location.origin}/api/order-success`,
        return_url: `${window.location.origin}/api/payment-failed`,
      };

      const order = await createNewOrder(chapaOrderData);
      window.location.href = order.checkout_url;

      } else if (data.payment === 'cash') {
      const cashOrderData = {
        ...baseOrder,
        payment: {
          method: data.payment as PaymentMethod,
          amount: checkout.total,
          currency: 'ETB',
          status: 'pending'
        },
        created_at: new Date().toISOString()
      };

      const order = await createNewOrder(cashOrderData);
      toast.success('Order placed successfully!');
      checkout.onNextStep();
      checkout.onReset();
    
      }
      checkout.onNextStep();
      cartDispatch({ type: 'RESET' });
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <CheckoutDelivery
            options={DELIVERY_OPTIONS}
          />

          <CheckoutPaymentMethods />

          <Button
            color="inherit"
            onClick={checkout.onBackStep}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutBillingInfo billing={checkout.billing} onBackStep={checkout.onBackStep} />

          <CheckoutSummary
            total={checkout.total}
            subtotal={checkout.subtotal}
            discount={checkout.discount}
            shipping={checkout.shipping}
            items={checkout.items}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Complete Order
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
} 