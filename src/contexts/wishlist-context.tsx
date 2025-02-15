import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { ICheckoutItem } from './cart-context';

type WishlistItem = {
  product: ICheckoutItem;
  quantity: number;
  colors: string[];
  size: string;
};

type WishlistState = {
  items: WishlistItem[];
  
};

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: { productId: string } }
  | { type: 'MOVE_TO_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } };

const initialState: WishlistState = {
  items: [],
};

const STORAGE_KEY = 'korecha-wishlist';

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.some(item => item.product.id === action.payload.product.id);
      if (exists) return state;
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId),
      };
    }

    case 'MOVE_TO_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId),
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    default:
      return state;
  }
};

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState, () => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 