import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product.types';
import { productService } from '../services/productService';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  selectedProduct: Product | null;
  categories: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  searchTerm: '',
  selectedProduct: null,
  categories: [],
  status: 'idle',
  error: null,
};

// Thunks - Async actions
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await productService.getAllProducts();
});

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: number, { rejectWithValue }) => {
    try {
      console.log(`Fetching product with ID: ${productId}`);
      const product = await productService.getProductById(productId);
      console.log('Successfully fetched product:', product);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return rejectWithValue('Error al cargar el producto. Por favor, intenta nuevamente.');
    }
  }
);

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  return await productService.getAllCategories();
});

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string) => {
    return await productService.getProductsByCategory(category);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filtrar productos por término de búsqueda
      if (action.payload) {
        state.filteredProducts = state.products.filter(product =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar productos';
      })
      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar el producto';
      })
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      })
      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      });
  },
});

export const { setSearchTerm, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
