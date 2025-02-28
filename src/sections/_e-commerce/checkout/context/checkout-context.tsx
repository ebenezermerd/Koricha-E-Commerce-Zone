import { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { useCart } from 'src/contexts/cart-context';
import { IAddressItem } from 'src/types/address';
import { CartItem }  from 'src/contexts/cart-context';
import axios from 'src/utils/axios';
import { toast } from 'src/components/snackbar'
// ----------------------------------------------------------------------

export type ICheckoutDeliveryOption = {
  value: number;
  label: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  label: string;
  description: string;
};

export type ICheckoutState = {
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  billing: IAddressItem | null;
  totalItems: number;
  items: CartItem[];
};

export type CheckoutContextProps = ICheckoutState & {
  completed: boolean;
  isAddressComplete: boolean;
  verifyAddressBeforeCheckout: () => Promise<boolean>;
  //
  onReset: () => void;
  //
  activeStep: number;
  
  onBackStep: () => void;
  onNextStep: () => void;
  onGotoStep: (step: number) => void;
  //
  onApplyShipping: (value: number) => void;
  onApplyDiscount: (value: number) => void;
  //
  onCreateBilling: (address: IAddressItem) => void;
  onEditBilling: (address: IAddressItem) => void;
};

const initialState: ICheckoutState = {
  total: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
  items: [],
};

// ----------------------------------------------------------------------

export const CheckoutContext = createContext({} as CheckoutContextProps);

type CheckoutProviderProps = {
  children: React.ReactNode;
};



export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { state: cart, dispatch: cartDispatch } = useCart();
  const [isAddressComplete, setIsAddressComplete] = useState(true);


  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [state, setState] = useState<ICheckoutState>({
    ...initialState,
    items: cart.items,
    subtotal: cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    total: cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
  });

  const onReset = useCallback(() => {
    setActiveStep(0);
    setCompleted(false);
    setState(initialState);
  }, []);

  const onNextStep = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, []);

  const onBackStep = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const onGotoStep = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const onApplyShipping = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      shipping: value,
      total: prev.subtotal - prev.discount + value,
    }));
  }, []);

  const onApplyDiscount = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      discount: value,
      total: prev.subtotal - value + prev.shipping,
    }));
  }, []);

  const onCreateBilling = useCallback((address: IAddressItem) => {
    setState((prev) => ({
      ...prev,
      billing: address,
    }));
  }, []);

  const onEditBilling = useCallback((address: IAddressItem) => {
    setState((prev) => ({
      ...prev,
      billing: address,
    }));
  }, []);

  const verifyAddressBeforeCheckout = async () => {
    try {
      const response = await axios.get('/api/user/address/verify');
      setIsAddressComplete(response.data.isComplete);
      return response.data.isComplete;
    } catch (error) {
      setIsAddressComplete(false);
      // Show toast notification
      toast.error(
        "Please complete your address information in account settings before checkout",
      );
      return false;
    }
  };

  
  const value = useMemo(
    () => ({
      ...state,
      completed,
      activeStep,
      onReset,
      isAddressComplete,
      verifyAddressBeforeCheckout,
      onNextStep,
      onBackStep,
      onGotoStep,
      onApplyShipping,
      onApplyDiscount,
      onCreateBilling,
      onEditBilling,
    }),
    [
      state,
      completed,
      activeStep,
      onReset,
      onNextStep,
      onBackStep,
      onGotoStep,
      isAddressComplete,
      verifyAddressBeforeCheckout,
      onApplyShipping,
      onApplyDiscount,
      onCreateBilling,
      onEditBilling,
    ]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) throw new Error('useCheckout must be used within CheckoutProvider');

  return context;
}; 