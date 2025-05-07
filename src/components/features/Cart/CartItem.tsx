import {
    Flex,
    Box,
    Image,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    IconButton,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { DeleteIcon } from '@chakra-ui/icons';
  import { CartItem as CartItemType } from '../../../types/cart.types';
  import { useCart } from '../../../hooks/useCart';
  
  interface CartItemProps {
    item: CartItemType;
  }
  
  export default function CartItem({ item }: CartItemProps) {
    const { updateItemQuantity, removeItemFromCart } = useCart();
    const { product, quantity } = item;
  
    return (
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        mb={4}
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Flex align="center" mb={{ base: 4, md: 0 }}>
          <Image
            src={product.image}
            alt={product.title}
            boxSize="80px"
            objectFit="contain"
            mr={4}
          />
          <Box maxW={{ base: '100%', md: '300px' }}>
            <Text fontWeight="semibold" isTruncated>
              {product.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Categoría: {product.category}
            </Text>
            <Text fontWeight="bold" mt={1}>
              ${product.price.toFixed(2)} c/u
            </Text>
          </Box>
        </Flex>
  
        <Flex align="center">
          <NumberInput
            defaultValue={quantity}
            min={1}
            max={10}
            size="sm"
            maxW={20}
            mr={4}
            value={quantity}
            onChange={(_, value) => updateItemQuantity(product.id, value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
  
          <Text fontWeight="bold" w="100px" textAlign="right" mr={4}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
  
          <IconButton
            aria-label="Eliminar producto"
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="ghost"
            onClick={() => removeItemFromCart(product.id)}
          />
        </Flex>
      </Flex>
    );
  }
