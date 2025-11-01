import { create } from 'zustand';
import { ICartItem, IProduct } from '../interfaces';


interface CartState {
  items: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
  // optional helper — doesn't auto-subscribe, useful for non-react usage
  getTotalValue: () => number;
  // optional helper to get total count of items (sum of quantities)
  getTotalCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    // convert incoming price (string|number) to number safely
    const parsedPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price || '0'));
    const id = product.id ?? `${product.title}-${parsedPrice}`;

    const existing = get().items.find((p) => p.id === id);
    if (existing) {
      set({
        items: get().items.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      });
    } else {
      const item: ICartItem = {
        id,
        title: product.title,
        description: product.description,
        imageURL: product.imageURL,
        price: isNaN(parsedPrice) ? 0 : parsedPrice,
        colors: product.colors,
        category: product.category,
        quantity: 1,
      };
      set({ items: [...get().items, item] });
    }
  },

  removeFromCart: (id) => {
    set({ items: get().items.filter((p) => p.id !== id) });
  },

  increment: (id) => {
    set({
      items: get().items.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      ),
    });
  },

  decrement: (id) => {
    set({
      items: get().items
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p
        )
        .filter((p) => p.quantity > 0),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotalValue: () => {
    return get().items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  },

  getTotalCount: () => {
    return get().items.reduce((acc, it) => acc + it.quantity, 0);
  },
}));
