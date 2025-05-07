import { Box, Heading, Text, Container, SimpleGrid, Button, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ProductList from '../../components/features/ProductList/ProductList';
import { useProducts } from '../../hooks/useProducts';
import storeImage from '../../assets/store.jpg';

export default function Home() {
  const { searchTerm } = useProducts();

  return (
    <Box>
      {!searchTerm && (
        <Box py={10}>
          <Container maxW={'7xl'}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Flex direction="column" justifyContent="center">
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                  <Text
                    as={'span'}
                    position={'relative'}
                    color={'teal.400'}>
                    FakeStore
                  </Text>
                  <br />
                  <Text as={'span'} color={'teal.400'}>
                    Compra online
                  </Text>
                </Heading>
                <Text
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color={useColorModeValue('gray.600', 'gray.300')}
                  mt={5}
                  fontSize={'xl'}>
                  Los mejores productos a los mejores precios. Explora nuestra tienda y encuentra lo que necesitas.
                </Text>
                <Button
                  onClick={() => {
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  colorScheme="teal"
                  mt={8}
                  size="lg"
                  rightIcon={<ChevronRightIcon />}>
                  Ver Productos
                </Button>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Image 
                  alt={'Store Image'} 
                  src={storeImage}
                  objectFit={'cover'} 
                />
              </Flex>
            </SimpleGrid>
          </Container>
        </Box>
      )}

      <Box py={10} id="products-section">
        <Container maxW={'7xl'}>
          {searchTerm ? (
            <Heading size="lg" mb={6}>
              Resultados para: "{searchTerm}"
            </Heading>
          ) : (
            <Heading size="lg" mb={6}>
              Nuestros Productos
            </Heading>
          )}
          <ProductList />
        </Container>
      </Box>
    </Box>
  );
}
