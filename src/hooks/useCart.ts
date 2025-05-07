import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../store/cartSlice';
import { Product } from '../types/product.types';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  // Funciones para interactuar con el carrito
  const addItemToCart = (product: Product, quantity: number = 1) => {
    dispatch(addToCart({ product, quantity }));
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const removeItemFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  // Cálculos adicionales
  const getItemQuantity = (productId: number) => {
    const item = cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    emptyCart,
    getItemQuantity,
  };
};
