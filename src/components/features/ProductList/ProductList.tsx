import { SimpleGrid, Text, Center, Spinner } from '@chakra-ui/react';
import ProductCard from '../ProductCard/ProductCard';
import { useProducts } from '../../../hooks/useProducts';

export default function ProductList() {
  const { filteredProducts, status, error } = useProducts();

  if (status === 'loading') {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (status === 'failed') {
    return (
      <Center py={10}>
        <Text color="red.500">{error || 'Ocurrió un error al cargar los productos'}</Text>
      </Center>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Center py={10}>
        <Text>No se encontraron productos</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} w="full">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}
