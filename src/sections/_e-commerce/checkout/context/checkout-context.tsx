import { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { useCart } from 'src/contexts/cart-context';
import { IAddressItem } from 'src/types/address';
import { CartItem }  from 'src/contexts/cart-context';

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
    cartDispatch({ type: 'UPDATE_SHIPPING', payload: { cost: value } });
  }, [cartDispatch]);

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

  const value = useMemo(
    () => ({
      ...state,
      completed,
      activeStep,
      onReset,
      onNextStep,
      onBackStep,
      onGotoStep,
      onApplyShipping,
      onApplyDiscount,
      onCreateBilling,
    }),
    [
      state,
      completed,
      activeStep,
      onReset,
      onNextStep,
      onBackStep,
      onGotoStep,
      onApplyShipping,
      onApplyDiscount,
      onCreateBilling,
    ]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) throw new Error('useCheckout must be used within CheckoutProvider');

  return context;
}; 