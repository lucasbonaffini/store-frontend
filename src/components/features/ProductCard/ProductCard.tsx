import {
    Box,
    Image,
    Badge,
    Flex,
    Text,
    Button,
    useColorModeValue,
    Tooltip,
    IconButton,
  } from '@chakra-ui/react';
  import { StarIcon, AddIcon } from '@chakra-ui/icons';
  import { Link as RouterLink } from 'react-router-dom';
  import { Product } from '../../../types/product.types';
  import { useCart } from '../../../hooks/useCart';
  
  interface ProductCardProps {
    product: Product;
  }
  
  export default function ProductCard({ product }: ProductCardProps) {
    const { addItemToCart, getItemQuantity } = useCart();
    const quantity = getItemQuantity(product.id);
  
    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={useColorModeValue('white', 'gray.800')}
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      >
        <Box position="relative" height="200px" overflow="hidden">
          <Image
            src={product.image}
            alt={product.title}
            width="100%"
            height="100%"
            objectFit="contain"
            p={4}
          />
        </Box>
  
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {product.category}
            </Badge>
          </Box>
  
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            height="50px"
          >
            {product.title}
          </Box>
  
          <Box>
            ${product.price.toFixed(2)}
          </Box>
  
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < Math.round(product.rating.rate) ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {product.rating.count} reseñas
            </Box>
          </Box>
  
          <Flex mt="4" justifyContent="space-between" alignItems="center">
            <Button
              as={RouterLink}
              to={`/product/${product.id}`}
              colorScheme="teal"
              variant="outline"
              size="sm"
            >
              Ver detalles
            </Button>
            
            <Tooltip label="Agregar al carrito" hasArrow>
              <IconButton
                colorScheme="teal"
                aria-label="Agregar al carrito"
                icon={<AddIcon />}
                size="sm"
                onClick={() => addItemToCart(product, 1)}
                isDisabled={quantity > 0}
              />
            </Tooltip>
          </Flex>
          
          {quantity > 0 && (
            <Text fontSize="sm" color="teal.500" mt={2} textAlign="right">
              {quantity} en carrito
            </Text>
          )}
        </Box>
      </Box>
    );
  }
