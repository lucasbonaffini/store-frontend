import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../types/cart.types';
import { Product } from '../types/product.types';
import { cartService } from '../services/cartService';

// Obtener el carrito inicial del localStorage
const initialState: Cart = cartService.getCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product, quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          product,
          quantity
        });
      }

      // Recalcular totales
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      // Guardar en localStorage
      cartService.saveCart(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === productId);

      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity;
        } else {
          // Si la cantidad es 0 o negativa, eliminamos el producto
          state.items.splice(itemIndex, 1);
        }

        // Recalcular totales
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

        // Guardar en localStorage
        cartService.saveCart(state);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);

      // Recalcular totales
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      // Guardar en localStorage
      cartService.saveCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;

      // Guardar en localStorage
      cartService.saveCart(state);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
