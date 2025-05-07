export const ENDPOINTS = {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: number) => `/products/${id}`,
    PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
    CATEGORIES: '/products/categories',
  };
