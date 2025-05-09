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
  const { selectedProduct, error } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product | null>(null);
  const toast = useToast();

  // Convert ID to number
  const productId = id ? parseInt(id, 10) : null;

  // Function to load the product
  const fetchProductDirectly = useCallback(async (numericId: number) => {
    if (isNaN(numericId)) {
      console.error(`Invalid product ID: ${numericId}`);
      setLoadError('Invalid product ID');
      setIsLoading(false);
      return;
    }
    
    try {
      const product = await productService.getProductById(numericId);
      setProductData(product);
      setLoadError(null);
    } catch (err) {
      console.error('Error loading the product directly:', err);
      setLoadError('Could not load the product. Please try again.');
      toast({
        title: 'Error loading the product',
        description: 'There was a problem connecting to the server',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Effect to start loading when ID changes
  useEffect(() => {
    if (!productId) return;
    
    setIsLoading(true);
    setLoadError(null);
    
    // We use only one loading method to avoid race conditions
    fetchProductDirectly(productId);
    
    return () => {};
  }, [productId, fetchProductDirectly]);
  
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Loading state
  if (isLoading) {
    return (
      <Container maxW={'7xl'} py={10}>
        <Flex mb={6}>
          <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} colorScheme="teal" variant="outline">
            Back
          </Button>
        </Flex>
        <Skeleton height="500px" />
      </Container>
    );
  }

  // Error state
  if (loadError || (!productData && !selectedProduct)) {
    return (
      <Container maxW={'7xl'} py={10}>
        <Flex mb={6}>
          <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} colorScheme="teal" variant="outline">
            Back
          </Button>
        </Flex>
        <Center flexDirection="column" py={10}>
          <Text color="red.500" fontSize="xl" mb={4}>
            {loadError || error || 'Could not load the product'}
          </Text>
          <Button colorScheme="teal" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </Center>
      </Container>
    );
  }

  // We use productData if available, otherwise selectedProduct from the store
  const displayProduct = productData || selectedProduct;

  return (
    <Box py={10}>
      <Container maxW={'7xl'}>
        <Flex mb={6}>
          <Button leftIcon={<ArrowBackIcon />} onClick={handleGoBack} colorScheme="teal" variant="outline">
            Back
          </Button>
        </Flex>
        {displayProduct && <ProductDetailComponent product={displayProduct} />}
      </Container>
    </Box>
  );
}
