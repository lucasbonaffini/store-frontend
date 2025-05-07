import { Product } from './product.types';

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
  }

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: string;
}
