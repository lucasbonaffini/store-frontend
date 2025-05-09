import { apiClient } from '../api';
import { ENDPOINTS } from '../api/endpoints';
import type { Product } from '../types/product.types';

export const productService = {
  /**
   * Get all products
   */
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(ENDPOINTS.PRODUCTS);
    return response.data;
  },

  /**
   * Get a product by ID
   */
  async getProductById(id: number): Promise<Product> {
    try {
      // We use a single strategy to avoid race conditions
      const response = await apiClient.get<Product>(ENDPOINTS.PRODUCT_BY_ID(id));
      return response.data;
    } catch {
      // If the first strategy fails, we try with the second one
      try {
        const response = await apiClient.get<Product[]>(ENDPOINTS.PRODUCTS);
        const product = response.data.find(p => p.id === id);
        if (product) return product;
        throw new Error('Product not found');
      } catch (error) {
        console.error('Error getting the product', error);
        throw new Error(`Could not get product with ID ${id}`);
      }
    }
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
    return response.data;
  },

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<string[]> {
    const response = await apiClient.get<string[]>(ENDPOINTS.CATEGORIES);
    return response.data;
  }
};
