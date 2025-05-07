import { Cart } from '../types/cart.types';
import { Product } from '../types/product.types';

// Mock de servicio para el carrito, utilizando localStorage
export const cartService = {
  /**
   * Obtener carrito actual
   */
  getCart(): Cart {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      return JSON.parse(cartData);
    }
    return { items: [], totalItems: 0, totalAmount: 0 };
  },

  /**
   * Guardar carrito
   */
  saveCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  /**
   * Agregar producto al carrito
   */
  addToCart(product: Product, quantity: number = 1): Cart {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Si el producto ya existe, incrementamos la cantidad
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, lo agregamos como nuevo item
      cart.items.push({
        id: product.id,
        product,
        quantity
      });
    }

    // Recalcular totales
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    // Guardar carrito actualizado
    this.saveCart(cart);
    return cart;
  },

  /**
   * Actualizar cantidad de un producto en el carrito
   */
  updateItemQuantity(productId: number, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === productId);

    if (itemIndex >= 0) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // Si la cantidad es 0 o negativa, eliminamos el producto
        cart.items.splice(itemIndex, 1);
      }

      // Recalcular totales
      cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
      cart.totalAmount = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      // Guardar carrito actualizado
      this.saveCart(cart);
    }

    return cart;
  },

  /**
   * Eliminar un producto del carrito
   */
  removeFromCart(productId: number): Cart {
    return this.updateItemQuantity(productId, 0);
  },

  /**
   * Vaciar el carrito
   */
  clearCart(): Cart {
    const emptyCart: Cart = { items: [], totalItems: 0, totalAmount: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  }
};
