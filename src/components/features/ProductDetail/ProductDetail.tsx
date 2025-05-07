import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    Badge,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
  import { StarIcon } from '@chakra-ui/icons';
  import { useState } from 'react';
  import { Product } from '../../../types/product.types';
  import { useCart } from '../../../hooks/useCart';
  
  interface ProductDetailProps {
    product: Product;
  }
  
  export default function ProductDetail({ product }: ProductDetailProps) {
    const { addItemToCart, getItemQuantity } = useCart();
    const [quantity, setQuantity] = useState(1);
    const inCart = getItemQuantity(product.id);
  
    const handleAddToCart = () => {
      addItemToCart(product, quantity);
      setQuantity(1);
    };
  
    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex justifyContent="center">
            <Image
              rounded={'md'}
              alt={product.title}
              src={product.image}
              fit={'contain'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {product.title}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                ${product.price.toFixed(2)}
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>{product.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('teal.500', 'teal.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Detalles del producto
                </Text>
  
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Categoría:
                    </Text>{' '}
                    <Badge colorScheme="teal">{product.category}</Badge>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Valoración:
                    </Text>{' '}
                    <Box display="flex" alignItems="center" as="span">
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < Math.round(product.rating.rate) ? 'teal.500' : 'gray.300'}
                            fontSize="sm"
                          />
                        ))}
                      <Box as="span" ml="2" fontSize="sm">
                        ({product.rating.rate}) - {product.rating.count} reseñas
                      </Box>
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </Stack>
  
            <Stack direction={{ base: 'column', sm: 'row' }} align={'center'} spacing={4}>
              <NumberInput
                defaultValue={1}
                min={1}
                max={10}
                value={quantity}
                onChange={(_, value) => setQuantity(value)}
                size="md"
                maxW={20}
                isDisabled={inCart > 0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                rounded={'full'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('teal.400', 'teal.500')}
                color={'white'}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                  bg: useColorModeValue('teal.500', 'teal.600'),
                }}
                onClick={handleAddToCart}
                isDisabled={inCart > 0}
              >
                {inCart > 0 ? `${inCart} en carrito` : 'Agregar al carrito'}
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }
