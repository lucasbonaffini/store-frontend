import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Skeleton, Center, Text, Button, Flex, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProductDetailComponent from '../../components/features/ProductDetail/ProductDetail';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/productService';
import { Product } from '../../types/product.types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loadProductById, selectedProduct, error } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product | null>(null);
  const toast = useToast();

  // Convertir el ID a número
  const productId = id ? parseInt(id, 10) : null;

  // Función para cargar el producto
  const fetchProductDirectly = useCallback(async (numericId: number) => {
    if (isNaN(numericId)) {
      console.error(`ID de producto inválido: ${numericId}`);
      setLoadError('ID de producto inválido');
      setIsLoading(false);
      return;
    }
    
    try {
      const product = await productService.getProductById(numericId);
      setProductData(product);
      setLoadError(null);
    } catch (err) {
      console.error('Error al cargar el producto directamente:', err);
      setLoadError('No se pudo cargar el producto. Por favor, intenta nuevamente.');
      toast({
        title: 'Error al cargar el producto',
        description: 'Ocurrió un problema al conectar con el servidor',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Efecto para iniciar la carga cuando cambia el ID
  useEffect(() => {
    if (!productId) return;
    
    setIsLoading(true);
    setLoadError(null);
    
    // Usamos solo un método de carga para evitar condiciones de carrera
    fetchProductDirectly(productId);
    
    return () => {};
  }, [productId, fetchProductDirectly]);
  
  // Ya no necesitamos este efecto porque no estamos usando Redux para cargar
  // El estado se maneja completamente en fetchProductDirectly

  const handleGoBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  // Estado de carga
  if (isLoading) {
    return (
      <Container maxW={'7xl'} py={10}>
        <Flex mb={6}>
          <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} colorScheme="teal" variant="outline">
            Volver
          </Button>
        </Flex>
        <Skeleton height="500px" />
      </Container>
    );
  }

  // Estado de error
  if (loadError || (!productData && !selectedProduct)) {
    return (
      <Container maxW={'7xl'} py={10}>
        <Flex mb={6}>
          <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} colorScheme="teal" variant="outline">
            Volver
          </Button>
        </Flex>
        <Center flexDirection="column" py={10}>
          <Text color="red.500" fontSize="xl" mb={4}>
            {loadError || error || 'No se pudo cargar el producto'}
          </Text>
          <Button colorScheme="teal" onClick={() => window.location.reload()}>
            Intentar nuevamente
          </Button>
        </Center>
      </Container>
    );
  }

  // Usamos productData si está disponible, de lo contrario selectedProduct del store
  const displayProduct = productData || selectedProduct;

  return (
    <Box py={10}>
      <Container maxW={'7xl'}>
        <Flex mb={6}>
          <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} colorScheme="teal" variant="outline">
            Volver
          </Button>
        </Flex>
        {displayProduct && <ProductDetailComponent product={displayProduct} />}
      </Container>
    </Box>
  );
}
