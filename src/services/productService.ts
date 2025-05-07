import { apiClient } from '../api';
import { ENDPOINTS } from '../api/endpoints';
import type { Product } from '../types/product.types';

export const productService = {
  /**
   * Obtener todos los productos
   */
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(ENDPOINTS.PRODUCTS);
    return response.data;
  },

  /**
   * Obtener un producto por ID
   */
  async getProductById(id: number): Promise<Product> {
    try {
      // Usamos una sola estrategia para evitar condiciones de carrera
      const response = await apiClient.get<Product>(ENDPOINTS.PRODUCT_BY_ID(id));
      return response.data;
    } catch {
      // Si falla la primera estrategia, intentamos con la segunda
      try {
        const response = await apiClient.get<Product[]>(ENDPOINTS.PRODUCTS);
        const product = response.data.find(p => p.id === id);
        if (product) return product;
        throw new Error('Producto no encontrado');
      } catch (error) {
        console.error('Error al obtener el producto', error);
        throw new Error(`No se pudo obtener el producto con ID ${id}`);
      }
    }
  },

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
    return response.data;
  },

  /**
   * Obtener todas las categorías
   */
  async getAllCategories(): Promise<string[]> {
    const response = await apiClient.get<string[]>(ENDPOINTS.CATEGORIES);
    return response.data;
  }
};
