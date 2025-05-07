import { Cart } from '../types/cart.types';
import { Product } from '../types/product.types';

// Mock cart service using localStorage
export const cartService = {
  /**
   * Get current cart
   */
  getCart(): Cart {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      return JSON.parse(cartData);
    }
    return { items: [], totalItems: 0, totalAmount: 0 };
  },

  /**
   * Save cart
   */
  saveCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  /**
   * Add product to cart
   */
  addToCart(product: Product, quantity: number = 1): Cart {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // If the product already exists, increase the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If it doesn't exist, add it as a new item
      cart.items.push({
        id: product.id,
        product,
        quantity
      });
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    // Save updated cart
    this.saveCart(cart);
    return cart;
  },

  /**
   * Update product quantity in cart
   */
  updateItemQuantity(productId: number, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === productId);

    if (itemIndex >= 0) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // If the quantity is 0 or negative, remove the product
        cart.items.splice(itemIndex, 1);
      }

      // Recalculate totals
      cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
      cart.totalAmount = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

      // Save updated cart
      this.saveCart(cart);
    }

    return cart;
  },

  /**
   * Remove a product from the cart
   */
  removeFromCart(productId: number): Cart {
    return this.updateItemQuantity(productId, 0);
  },

  /**
   * Empty the cart
   */
  clearCart(): Cart {
    const emptyCart: Cart = { items: [], totalItems: 0, totalAmount: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  }
};
