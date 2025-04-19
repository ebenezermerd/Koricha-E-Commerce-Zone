import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { IProductItemProps } from 'src/types/product';

export type ICheckoutItem = {
    id: string;
    name: string;
    coverImg: string;
    price: number;
    available: number;
    subtotal?: number;
    quantity_threshold: number | null;
    additional_cost_type: 'percentage' | 'fixed' | null;
    additional_cost_percentage: number | null;
    additional_cost_fixed: number | null;
  };
  
 export type CartItem = {
  product: ICheckoutItem;
  quantity: number;
  colors: string[];
  size: string;
};

type CartState = {
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  discountCode?: string;
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string } }
  | { type: 'UPDATE_SHIPPING'; payload: { cost: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'RESET' };

const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  tax: 0,
  discountCode: '',
};

const calculateCartTotals = (items: CartItem[], discountCode: string = '', shipping: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = discountCode ? subtotal * 0.1 : 0; // 10% discount if code is applied
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal - discount + shipping + tax;

  return { subtotal, discount, shipping, tax, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems, state.discountCode, state.shipping),
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems, state.discountCode, state.shipping),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems, state.discountCode, state.shipping),
      };
    }

    case 'APPLY_DISCOUNT': {
      if (action.payload.code === 'DISCOUNT10') {
        return {
          ...state,
          discountCode: action.payload.code,
          ...calculateCartTotals(state.items, action.payload.code, state.shipping),
        };
      }
      return state;
    }

    case 'UPDATE_SHIPPING': {
      return {
        ...state,
        ...calculateCartTotals(state.items, state.discountCode, action.payload.cost),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'RESET':
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Add storage key constant
const STORAGE_KEY = 'korecha-cart';

// Update CartProvider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 