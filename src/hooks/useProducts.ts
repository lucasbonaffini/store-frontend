import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProducts, fetchProductById, fetchCategories, setSearchTerm } from '../store/productSlice';
import { AppDispatch } from '../store';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    products, 
    filteredProducts, 
    selectedProduct, 
    categories, 
    status, 
    error,
    searchTerm
  } = useSelector((state: RootState) => state.products);

  // Cargar productos al montar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Funciones para interactuar con productos
  const loadProductById = (id: number) => {
    dispatch(fetchProductById(id));
  };

  const searchProducts = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  return {
    products,
    filteredProducts,
    selectedProduct,
    categories,
    status,
    error,
    searchTerm,
    loadProductById,
    searchProducts,
  };
};
